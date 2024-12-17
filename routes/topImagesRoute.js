const express = require("express");
const router = express.Router();

const topImagesController = require("../controllers/topImages");

const imageHelper = require("../helpers/store_image");

const Middleware = require("../middlewares/auth_middleware");


// Top Images route
router.get("/topImages", Middleware.isAdmin, Middleware.authenticate, topImagesController.topImages);


// Add-Edit-Delete Top Images route
router.get("/add_topImages/:id?", Middleware.isAdmin, Middleware.authenticate, topImagesController.displayTopImagesPage);
router.post("/add_topImages", imageHelper.uploadTopImages, topImagesController.validateTopImage, topImagesController.addOrEditTopImage);
router.post("/add_topImages/delete/:id", imageHelper.uploadTopImages, topImagesController.deleteTopImage);


// API
router.get("/api/topImages", topImagesController.topImagesAPI);



module.exports = router;