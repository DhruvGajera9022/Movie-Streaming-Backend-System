const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile");

const imageHelper = require("../helpers/store_image");

const Middleware = require("../middlewares/auth_middleware");
const JWTMiddleware = require("../middlewares/jwt_token");


// Profile route
router.get("/profile", Middleware.authenticate, profileController.profile);
router.post("/profile", imageHelper.uploadUserImage, profileController.validateProfileUpdate, profileController.editProfile);


// Address route
router.get("/getProfile", Middleware.authenticate, profileController.getAddress);
router.post("/address/:id?", Middleware.authenticate, profileController.addAddress);
router.post("/address/delete/:id?", Middleware.authenticate, profileController.deleteAddress);


// API
router.get("/api/me", JWTMiddleware.JWTMiddleware, profileController.meAPI);
router.get("/api/address", JWTMiddleware.JWTMiddleware, profileController.addressAPI);

router.post("/api/address", JWTMiddleware.JWTMiddleware, profileController.validateAddress, profileController.postAddressAPI);
router.post("/api/editProfile", JWTMiddleware.JWTMiddleware, imageHelper.uploadUserImage, profileController.updateProfileAPI);

router.delete("/api/delete/address/:id", JWTMiddleware.JWTMiddleware, profileController.deleteAddressAPI);


module.exports = router;