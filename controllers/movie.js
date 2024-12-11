const Movies = require("../models/movie");
const Category = require("../models/category");

const fs = require('fs');
const { DateTime } = require("luxon");
const { body, validationResult } = require("express-validator");

const dateHelper = require("../helpers/date_formator");
const convertOverview = require('../helpers/html_decode');



const getMovies = async (req, res) => {
    let allMovies = await getAllMovies();

    allMovies = await Promise.all(
        allMovies.map(async (movie) => {
            const genreIds = movie.genre_ids;

            // Convert the overview
            const newOverview = await convertOverview(movie.overview);

            const categories = await Promise.all(
                genreIds.map(async (categoryId) => {
                    const parsedCategoryId = parseInt(categoryId.replace(/"/g, ''));

                    // Fetch the category based on the parsed ID
                    const category = await Category.findOne({ where: { id: parsedCategoryId } });

                    // Check if category exists
                    if (category) {
                        return category.dataValues.name;
                    } else {
                        return 'No category found';
                    }
                })
            );


            return {
                ...movie.dataValues,
                formattedDate: DateTime.fromISO(movie.release_date).toFormat("dd-MMMM-yyyy"),
                newOverview: newOverview,
                categories,
            };
        })
    );

    res.render("movie/movie", {
        title: "Movie",
        allMovies,
    });
};



// To render page according to add or edit request
const displayMoviePage = async (req, res) => {

    // Operation on role
    const id = req.params.id;

    if (id) {
        const movie = await Movies.findOne({ where: { id } });
        if (movie) {
            res.render("movie/add_movie", {
                title: "Add Movie",
                movie: movie
            });
        } else {
            return res.status(404).send("Movie not found.");
        }
    } else {
        res.render("movie/add_movie", {
            title: "Add Movie",
            movie: null
        });
    }

}
// To add-edit movie
const addOrEditMovie = async (req, res) => {
    try {

        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let {
            id,
            title,
            overview,
            category,
            original_language,
            original_title,
            popularity,
            release_date,
            adult,
            video,
            vote_average,
            vote_count,
            image_old,
        } = req.body;

        // Use the uploaded file if present; otherwise, fallback to the old image
        let image = req.file ? req.file.filename : image_old;

        // if new image is uploaded then old image is deleted
        if (req.file && image_old) {
            fs.unlink(`assets/img/movieImages/${image_old}`, (err) => {
                if (err) {
                    console.error("Failed to delete old image:", err);
                }
            });
        }

        // Convert checkbox values to booleans
        adult = adult === "on";
        video = video === "on";

        const genre_ids = Array.isArray(category)
            ? category.join(",")
            : category || null;

        if (id) {
            // Update a movie
            const isMovieUpdated = await Movies.update({
                title,
                overview,
                genre_ids,
                original_language,
                original_title,
                popularity,
                release_date,
                adult,
                video,
                vote_average,
                vote_count,
                poster_path: image,
                backdrop_path: image
            },
                { where: { id: id } }
            );

            if (isMovieUpdated > 0) {
                return res.redirect("/movie");
            }

        } else {
            // Create a new movie
            const newMovie = await Movies.create({
                title,
                overview,
                genre_ids,
                original_language,
                original_title,
                popularity,
                release_date,
                adult,
                video,
                vote_average,
                vote_count,
                poster_path: image,
                backdrop_path: image,
            });

            if (newMovie) {
                return res.redirect("/movie");
            } else {
                return res.status(500).send("Failed to create movie.");
            }
        }
    } catch (error) {
        console.error("Error in addOrEditMovie:", error);
        return res.status(500).send("An error occurred.");
    }
};
// To delete movie
const deleteMovie = async (req, res) => {
    const id = req.params.id;

    const movie = await Movies.findOne({
        attributes: ['poster_path'],
        where: { id },
    });

    if (!movie) {
        return res.send("Movie not found.");
    }

    const image = movie.poster_path;

    await Movies.destroy({ where: { id } });

    if (image) {
        const imagePath = `assets/img/movieImages/${image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image:", err);
            }
        });
    }
    res.redirect("/movie");
}
// validate movie fields
const validateMovie = [
    body("title").notEmpty().withMessage("Title is required."),
    body("overview").isLength({ min: 10 }).withMessage("Overview must be at least 10 characters."),
    body("category")
        .notEmpty()
        .withMessage("Category is required.")
        .bail()
        .isArray()
        .withMessage("Category must be an array."),
    body("original_language")
        .notEmpty()
        .withMessage("Original language is required.")
        .isLength({ max: 2 })
        .withMessage("Original language should be a valid ISO 639-1 code."),
    body("release_date")
        .optional()
        .isISO8601()
        .withMessage("Release date must be a valid date."),
    body("popularity")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Popularity must be a positive number."),
    body("vote_average")
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage("Vote average must be between 0 and 10."),
    body("vote_count")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Vote count must be a positive integer."),
];



// Home API - Contains categories and movies
const homeAPI = async (req, res) => {
    try {

        let categories = await Category.findAll({
            order: [['id', "DESC"]]
        });

        if (!categories) {
            res.json({
                status: false,
                message: "No category available",
            });
        }

        categories = categories.filter(category => category.isActive);

        // Process each category and associate movies
        const categoryWithMovie = await Promise.all(categories.map(async (cat) => {
            // Fetch movies for the current category
            const movies = await getAllMovies();

            const filteredMovies = movies.filter(movie =>
                movie.genre_ids.includes(cat.id.toString())
            );

            if (filteredMovies.length === 0) {
                return {
                    ...cat.dataValues,
                    movies: []
                };
            }

            const movieDetail = await Promise.all(
                filteredMovies.map(async (movie) => {
                    const movies = await movieData(movie);
                    return movies;
                })
            );

            // Attach movie details to the category
            cat.dataValues.movies = movieDetail;
            return cat;

        }));


        const movies = await getAllMovies();

        const topPics = [];
        const upcomingMovies = [];
        const blockbuster = [];


        // Add top pics movies to the collection
        topPics.push(
            ...movies.filter(movies => movies.vote_average > 7.5)
        );

        const transformedTopPics = await Promise.all(
            topPics.map(async (movie) => {
                const topMovies = await movieData(movie);
                return topMovies;
            })
        );

        let topPicsObj = {
            title: "Top Pics For You",
            isActive: true,
            movies: transformedTopPics,
        }


        // Add upcoming movies to the collection
        upcomingMovies.push(
            ...movies.filter(movie => new Date(movie.release_date) > new Date())
        );

        const transformedMovies = await Promise.all(
            upcomingMovies.map(async (movie) => {
                const upcomingMovies = await movieData(movie);
                return upcomingMovies;
            })
        );

        const upcomingMoviesObj = {
            title: "Upcoming Movie",
            isActive: true,
            movies: transformedMovies
        }


        // Add blockbuster movies to the collection
        blockbuster.push(
            ...movies.filter(movie => movie.popularity > 100)
        );

        const transformedBlockbuster = await Promise.all(
            blockbuster.map(async (movie) => {
                const blockbusterMovies = await movieData(movie);
                return blockbusterMovies;
            })
        );

        const blockbusterMoviesObj = {
            title: "Blockbuster Movie",
            isActive: true,
            movies: transformedBlockbuster
        }


        res.json({
            status: true,
            data: [
                topPicsObj.isActive == true ? topPicsObj : '',
                upcomingMoviesObj.isActive == true ? upcomingMoviesObj : '',
                blockbusterMoviesObj.isActive == true ? blockbusterMoviesObj : '',
                ...categoryWithMovie
            ]
        });

    } catch (error) {
        res.json({
            status: false,
            message: "Error in Home API"
        });
    }
}



// Single Movie API
const singleMovieAPI = async (req, res) => {
    try {
        const id = req.params.id;
        const baseURL = `${process.env.URL}${process.env.PORT}`;

        // Find the movie by ID
        const movie = await Movies.findOne({ where: { id: id } });

        if (!movie) {
            return res.json({
                status: false,
                message: "Movie not found."
            });
        }

        let categoryId = movie.genre_ids;

        const categoryNames = await Promise.all(
            categoryId.map(async (id) => {
                const category = await Category.findOne({ where: { id: id } });
                return category ? category.name : null;
            })
        );

        const movieDetail = {
            id: movie.id,
            title: movie.title,
            overview: await convertOverview(movie.overview),
            category: categoryNames.filter((name) => name !== null),
            backdrop_path: `${baseURL}/img/movieImages/${movie.backdrop_path}`,
            original_language: movie.original_language,
            release_date: DateTime.fromISO(movie.release_date).toFormat("DD"),
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
        };

        res.json({
            status: true,
            data: movieDetail
        });
    } catch (error) {
        console.error("Error in Single Movie API:", error);
        res.json({
            status: false,
            message: "Error in Single Movie API."
        });
    }
};



// For formate the response data
const movieData = async (movie) => {

    const baseURL = `${process.env.URL}${process.env.PORT}`;

    return {
        id: movie.id,
        title: movie.title,
        overview: await convertOverview(movie.overview),
        // adult: movie.adult,
        backdrop_path: `${baseURL}/img/movieImages/${movie.backdrop_path}`,
        original_language: movie.original_language,
        // original_title: movie.original_title,
        // popularity: movie.popularity,
        // poster_path: `${baseURL}/img/movieImages/${movie.poster_path}`,
        release_date: DateTime.fromISO(movie.release_date).toFormat("DD"),
        // video: movie.video,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
    }
}



// Fetch movies
const getAllMovies = async (req, res) => {
    return await Movies.findAll({
        order: [['id', 'DESC']]
    });
}



module.exports = {
    getMovies,

    displayMoviePage,
    addOrEditMovie,
    deleteMovie,
    validateMovie,

    homeAPI,
    singleMovieAPI,
}