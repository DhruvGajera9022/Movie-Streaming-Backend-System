const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settings");

const imageHelper = require("../helpers/store_image");
const Middleware = require("../middlewares/auth_middleware");


// Settings
router.get("/getSettings", settingsController.getSettings);
router.get('/settings/:id?', Middleware.authenticate, Middleware.isAdmin, settingsController.displaySettings);


// Add-Edit-Delete Setting route
router.post("/add_settings", imageHelper.uploadSettingImages, settingsController.addSettings);


// API
router.get("/api/settings", settingsController.settingsAPI);

router.post("/api/settings", settingsController.postSettingsAPI);



module.exports = router;