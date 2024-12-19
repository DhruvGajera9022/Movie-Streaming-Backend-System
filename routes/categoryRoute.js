const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

const Middleware = require("../middlewares/auth_middleware");


// Category Route
router.get("/category", Middleware.authenticate, Middleware.isAdmin, categoryController.categories);
router.get("/getCategory", Middleware.authenticate, Middleware.isAdmin, categoryController.getCategory);


// Add-Edit-Delete Category route
router.get("/add_category/:id?", Middleware.authenticate, Middleware.isAdmin, categoryController.displayCategoryPage);
router.post("/add_category", categoryController.categoryValidationRules, categoryController.addOrEditCategory);
router.post("/add_category/delete/:id", categoryController.deleteCategory);



module.exports = router;