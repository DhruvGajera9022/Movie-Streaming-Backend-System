const express = require("express");
const route = express.Router();

const invoiceController = require("../controllers/invoice");

const Middleware = require("../middlewares/auth_middleware");

const JWTMiddleware = require("../middlewares/jwt_token");


// Invoice route
route.get("/invoice", Middleware.authenticate, Middleware.isAdmin, invoiceController.invoice);

// Delete invoice
route.post("/invoice_delete/:id", invoiceController.deleteInvoice);


// API
route.get("/api/invoice", JWTMiddleware.JWTMiddleware, invoiceController.invoiceAPI);
route.get("/api/singleInvoice/:id", JWTMiddleware.JWTMiddleware, invoiceController.singleInvoiceAPI);


module.exports = route;