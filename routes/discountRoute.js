const express = require("express");
const router = express.Router();

const discountController = require("../controllers/discount");

const imageHelper = require("../helpers/store_image");
const Middleware = require("../middlewares/auth_middleware");


// Discount route
router.get("/discount", Middleware.authenticate, Middleware.isAdmin, discountController.discount);


// Add-Edit-Delete Discount route
router.get("/add_discount/:id?", Middleware.authenticate, Middleware.isAdmin, discountController.displayDiscountPage);
router.post("/add_discount", imageHelper.uploadDiscountImages, discountController.validateDiscount, discountController.addOrEditDiscount);
router.post("/add_discount/delete/:id?", discountController.deleteDiscount);


// API
router.get("/api/discount", discountController.discountAPI);
router.get("/api/discount/single", discountController.singleDiscountAPI);


module.exports = router;