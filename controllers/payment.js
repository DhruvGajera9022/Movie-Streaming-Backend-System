const Razorpay = require("razorpay");

require("dotenv").config();
const Invoice = require("../models/invoice");


// Razorpay key and secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Take value from frontend and generate order and send order-id to frontend
const payment = async (req, res) => {

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);
        // console.log(response);
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};


// get the transaction data and generate an invoice
const generateInvoice = async (req, res) => {
    try {
        const paymentData = req.body;
        const userId = req.userId;

        // console.log("Payment Data: ", paymentData);

        const paymentAllData = await razorpay.payments.fetch(paymentData.payment_id);
        console.log("Payment Data:", paymentAllData);

        const existingInvoice = await Invoice.findOne({
            where: { userId: userId },
            order: [['id', 'DESC']],
        });

        const status = paymentAllData.captured ? 1 : 0;

        let validFrom, validTo;

        if (existingInvoice) {
            validFrom = new Date(existingInvoice.validTo);
        } else {
            validFrom = new Date();
        }

        // Add 1 month to validFrom
        validTo = new Date(validFrom);
        validTo.setMonth(validTo.getMonth() + 1);

        if (paymentAllData) {
            const isInvoiceGenerated = await Invoice.create({
                userId: userId,
                subscriptionId: paymentData.SubId,
                transactionId: paymentAllData.id,
                validFrom: validFrom,
                validTo: validTo,
                amount: paymentAllData.amount / 100,
                status,
            });

            console.log("Invoice generated.");
            const invoiceId = isInvoiceGenerated.id;

            // Send the invoice ID in the response
            return res.json({
                status: true,
                message: "Invoice generated successfully.",
                invoiceId: invoiceId
            });

        }

        return res.json({
            status: false,
            message: "Payment data not found.",
        });
    } catch (error) {
        return res.json({
            status: false,
            message: "Error in generate invoice.",
        });
    }
};







module.exports = {
    payment,
    generateInvoice,
};
