const Movies = require("../models/movie");
const Category = require("../models/category");
const fs = require('fs');
const dateHelper = require("../helpers/date_formator");



// To display movie page
const getMovies = async (req, res) => {
    let allMovies = await getAllMovies();

    allMovies = await Promise.all(
        allMovies.map(async (movie) => {
            const genreIds = movie.genre_ids;

            const categories = await Promise.all(
                genreIds.map(async (categoryId) => {
                    const parsedCategoryId = parseInt(categoryId.replace(/"/g, ''));

                    // Fetch the category based on the parsed ID
                    const category = await Category.findOne({ where: { id: parsedCategoryId } });
                    // console.log(category ? JSON.stringify(category.dataValues, null, 2) : 'No category found');
                    return category ? JSON.stringify(category.dataValues.name, null, 2) : 'No';
                })
            );

            return {
                ...movie.dataValues,
                formattedDate: dateHelper.formatDate(movie.release_date),
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
// To add-edit role
const addOrEditMovie = async (req, res) => {
    try {
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



// Movies API
const moviesAPI = async (req, res) => {
    try {
        let allMovies = await getAllMovies();

        const baseURL = `${process.env.URL}${process.env.PORT}`;

        allMovies = allMovies.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                adult: movie.adult,
                backdrop_path: `${baseURL}/img/movieImages/${movie.backdrop_path}`,
                genre_ids: movie.genre_ids,
                original_language: movie.original_language,
                original_title: movie.original_title,
                popularity: movie.popularity,
                poster_path: `${baseURL}/img/movieImages/${movie.backdrop_path}`,
                release_date: movie.release_date,
                video: movie.video,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
            }
        })

        res.json({
            status: true,
            movies: allMovies
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Error in Movies API"
        })
    }
}



// Home API - Contains categories and movies
const homeAPI = async (req, res) => {
    try {

        let categories = await Category.findAll({
            order: [['id', "DESC"]]
        });
        const baseURL = `${process.env.URL}${process.env.PORT}`;

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
                    details: "No movies available for this category"
                };
            }

            const movieDetail = filteredMovies.map(movie => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                adult: movie.adult,
                backdrop_path: `${baseURL}/img/movieImages/${movie.backdrop_path}`,
                original_language: movie.original_language,
                original_title: movie.original_title,
                popularity: movie.popularity,
                poster_path: `${baseURL}/img/movieImages/${movie.poster_path}`,
                release_date: movie.release_date,
                video: movie.video,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
            }));

            // Attach movie details to the category
            cat.dataValues.movies = movieDetail;
            return cat;
        }));


        res.json({
            status: true,
            category: categoryWithMovie
        })

    } catch (error) {
        res.json({
            status: false,
            message: "Error in Home API"
        })
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

    moviesAPI,
    homeAPI,
}