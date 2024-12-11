const express = require("express");
const route = express.Router();

const subscriptionController = require("../controllers/subscription");

const Middleware = require("../middlewares/auth_middleware");


// Subscription route
route.get("/subscription", Middleware.authenticate, Middleware.isAdmin, subscriptionController.subscription);

// Add-Edit-Delete Subscription route
route.get("/add_subscription/:id?", Middleware.authenticate, Middleware.isAdmin, subscriptionController.displaySubscriptionPage);
route.post("/add_subscription", subscriptionController.validateFields, subscriptionController.addOrEditSubscription);
route.post("/add_subscription/delete/:id", subscriptionController.deleteSubscription);


// API
route.get("/api/subscriptions", subscriptionController.subscriptionAPI);

module.exports = route;