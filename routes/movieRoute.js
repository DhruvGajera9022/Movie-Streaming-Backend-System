const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movie");

const Middleware = require("../middlewares/auth_middleware");

const imageHelper = require("../helpers/store_image");

// Movie route
router.get("/movie", movieController.getMovies);


// Add-Edit-Delete Movie route
router.get("/add_movie/:id?", Middleware.authenticate, Middleware.isAdmin, movieController.displayMoviePage);
router.post("/add_movie", imageHelper.uploadMovieImages, movieController.validateMovie, movieController.addOrEditMovie);
router.post("/add_movie/delete/:id", imageHelper.uploadMovieImages, movieController.deleteMovie);



// APIs
router.get("/api/home", movieController.homeAPI);
router.get("/api/movie/:id", movieController.singleMovieAPI);


module.exports = router;