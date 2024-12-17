const Invoice = require("../models/invoice");

const colors = require("colors");



// To display invoice page
const invoice = async (req, res) => {
    try {
        const allData = await getAllInvoice();

        res.render("invoice/invoice", {
            title: "Invoices",
            allData
        });
    } catch (error) {
        console.log(`Error in Invoice ${error}`.bgRed.white);
    }
}



// Delete invoice
const deleteInvoice = async (req, res) => {
    try {
        const id = req.params.id;
        await Invoice.destroy({ where: { id } });
        res.redirect("/invoice");
    } catch (error) {
        console.log(`Error in Delete Invoice ${error}`.bgRed.white);
    }
}



// Invoice API
const invoiceAPI = async (req, res) => {
    try {
        const allInvoices = await getAllInvoice();

        res.json({
            status: true,
            data: allInvoices,
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Error in Invoice API",
        });
    }
}



// get all invoice
const getAllInvoice = async (req, res) => {
    return Invoice.findAll({
        order: [['id', 'DESC']]
    });
}






module.exports = {
    invoice,

    deleteInvoice,

    invoiceAPI,
}