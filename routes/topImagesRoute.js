const express = require("express");
const router = express.Router();

const topImagesController = require("../controllers/topImages");

const imageHelper = require("../helpers/store_image");


// Top Images route
router.get("/topImages", topImagesController.topImages);


// Add-Edit-Delete Top Images route
router.get("/add_topImages/:id?", topImagesController.displayTopImagesPage);
router.post("/add_topImages", imageHelper.uploadTopImages, topImagesController.addOrEditTopImage);
router.post("/add_topImages/delete/:id", imageHelper.uploadTopImages, topImagesController.deleteTopImage);






module.exports = router;