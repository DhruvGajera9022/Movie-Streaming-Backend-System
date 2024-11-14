const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role");

const Middleware = require("../middlewares/auth_middleware");


// Role route
router.get("/role", Middleware.authenticate, Middleware.isAdmin, roleController.roles);
router.get("/getRoles", Middleware.authenticate, Middleware.isAdmin, roleController.getRole);


// Add-Edit-Delete Role route
router.get("/add_role/:id?", Middleware.authenticate, Middleware.isAdmin, roleController.displayRolePage);
router.post("/add_role", roleController.roleValidationRules, roleController.addOrEditRole);
router.post("/add_role/delete/:id", roleController.deleteRole);



module.exports = router;