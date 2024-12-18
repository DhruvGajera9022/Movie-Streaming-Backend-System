const Invoice = require("../models/invoice");
const Users = require("../models/user");
const Subscriptions = require("../models/subscription");

const colors = require("colors");



// To display invoice page
const invoice = async (req, res) => {
    try {
        let allData = await getAllInvoice();

        // allData = await Promise.all(allData.map(async (data) => {
        //     return {
        //         validFrom: DateTime.fromISO(data.validFrom).toFormat("dd-MMMM-yyyy"),
        //         validTo: DateTime.fromISO(data.validTo).toFormat("dd-MMMM-yyyy"),
        //     };
        // }));

        res.render("invoice/invoice", {
            title: "Invoices",
            allData
        });
    } catch (error) {
        console.log(`Error in Invoice ${error}`.bgRed.white);
    }
};



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
        const userId = req.userId;

        let allInvoices = await Invoice.findAll({ where: { userId } });

        allInvoices = await Promise.all(
            allInvoices.map(async (invoice) => {
                let user = await Users.findOne({ where: { id: invoice.userId } });
                let subscription = await Subscriptions.findOne({ where: { id: invoice.subscriptionId } });

                return {
                    invoice: {
                        id: invoice.id,
                        transactionId: invoice.transactionId,
                        amount: invoice.amount,
                        validFrom: invoice.validFrom,
                        validTo: invoice.validTo,
                        status: invoice.status,
                    },

                    user: {
                        fullName: user.fullName,
                        email: user.email,
                        number: user.number,
                    },

                    subscription: {
                        title: subscription.title,
                        resolution: subscription.resolution,
                        sound_quality: subscription.sound_quality,
                        supported_devices: subscription.supported_devices,
                        connection: subscription.connection
                    }
                }

            })
        )

        res.json({
            status: true,
            data: allInvoices
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Error in Invoice API",
        });
    }
}
// Single invoice API
const singleInvoiceAPI = async (req, res) => {
    try {
        const userId = req.userId;
        const invoiceId = req.params.id;

        let invoiceData = await Invoice.findOne({ where: { id: invoiceId } });

        if (!invoiceData) {
            res.json({
                status: false,
                message: "Invoice not found",
            });
        }

        let userData = await Users.findOne({ where: { id: invoiceData.userId } });
        let subscriptionData = await Subscriptions.findOne({ where: { id: invoiceData.subscriptionId } });


        const invoice = {
            id: invoiceData.id,
            transactionId: invoiceData.transactionId,
            amount: invoiceData.amount,
            validFrom: invoiceData.validFrom,
            validTo: invoiceData.validTo,
            status: invoiceData.status,
        }

        const user = {
            fullName: userData.fullName,
            email: userData.email,
            number: userData.number,
        }

        const subscription = {
            title: subscriptionData.title,
            resolution: subscriptionData.resolution,
            sound_quality: subscriptionData.sound_quality,
            supported_devices: subscriptionData.supported_devices,
            connection: subscriptionData.connection
        }


        res.json({
            status: true,
            data: {
                invoice: invoice,
                user: user,
                subscription: subscription
            }
        });
    } catch (error) {
        res.json({
            status: false,
            message: "Error in Single Invoice API",
        });
        console.log(error);
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
    singleInvoiceAPI,
}