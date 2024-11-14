const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const Middleware = require("../middlewares/auth_middleware");


// Users route
router.get("/users", Middleware.authenticate, Middleware.isAdmin, userController.allUsersData);


// Add-Edit-Delete User route
router.get("/user/:id?", Middleware.authenticate, Middleware.isAdmin, userController.displayUserFormPage);
router.post("/add_user", userController.userValidationRules, userController.addOrEditUser);
router.post("/user/delete/:id", userController.deleteUser);

// Get user by id
router.get("/getUser", Middleware.authenticate, Middleware.isAdmin, userController.singleUserData);


module.exports = router;