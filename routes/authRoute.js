const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../passport");

const authController = require("../controllers/auth");

const imageHelper = require("../helpers/store_image");
const Middleware = require("../middlewares/auth_middleware");
const JWTMiddleware = require("../middlewares/jwt_token");


router.use(passport.initialize());
router.use(passport.session());


// Login routes
router.get("/login", Middleware.reverseAuthenticate, authController.loginPage);
router.post("/login", authController.validateLogin, authController.loginUser);


// Registration routes
router.get("/register", Middleware.reverseAuthenticate, authController.registerPage);
router.post("/register", authController.validateRegistration, authController.registerUser);


// Google Authentication
router.get("/auth/google", passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get("/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/register',
    }), authController.registerWithGoogle);


// Facebook Authentication
router.get("/auth/facebook", passport.authenticate('facebook'));
router.get("/auth/facebook/callback",
    passport.authenticate('facebook', {
        failureRedirect: '/register',
    }), authController.registerWithFacebook);


// Forgot password routes
router.get("/forgot_password", Middleware.reverseAuthenticate, authController.forgotPassword);
router.post("/forgot_password", authController.validateForgotPassword, authController.checkEmail);


// Password recovery routes
router.get("/recover_password/:id", Middleware.reverseAuthenticate, authController.recoverPassword);
router.post("/recover_password/:id", authController.validatePasswordChange, authController.changePassword);


// API
router.post("/api/login", authController.loginAPI);
router.post("/api/register", authController.validateRegistration, authController.registerAPI);



module.exports = router;