const Subscription = require("../models/subscription");
const colors = require("colors");
const { body, validationResult } = require("express-validator");


// To display subscription page
const subscription = async (req, res) => {
    try {

        const allData = await getAllSubscription();

        res.render("subscription/subscription", {
            title: "Subscriptions",
            allData
        });
    } catch (error) {
        console.log(`Error in Subscription route ${error}`.bgRed.white);
    }
}



// To render page according to add or edit request
const displaySubscriptionPage = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const subscription = await Subscription.findOne({ where: { id: id } });
            if (!subscription) {
                console.log("Subscription data not found".bgRed.white);
            }

            res.render("subscription/add_subscription", {
                title: "Edit Subscription",
                subscription,
            });
        } else {
            res.render("subscription/add_subscription", {
                title: "Add Subscription",
                subscription: null
            });
        }
    } catch (error) {
        console.log(`Error in Display Subscription Page: ${error}`.bgRed.white);
    }
}
// To add-edit Subscription
const addOrEditSubscription = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { id, title, price, resolution, sound_quality, supported_devices, connection, isActive } = req.body;

        isActive = isActive === "on";

        if (id) {
            const isSubscriptionUpdated = await Subscription.update({
                title,
                price,
                resolution,
                sound_quality,
                supported_devices,
                connection,
                isActive,
            },
                { where: { id: id } }
            );

            if (isSubscriptionUpdated > 0) {
                res.redirect("/subscription");
            }
        } else {
            const isSubscriptionAdded = await Subscription.create({
                title,
                price,
                resolution,
                sound_quality,
                supported_devices,
                connection,
                isActive,
            });

            if (isSubscriptionAdded) {
                res.redirect("/subscription");
            }
        }

    } catch (error) {
        console.log(`Error in Add or Edit Subscription: ${error}`.bgRed.white);
    }
}
// To delete Subscription
const deleteSubscription = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            await Subscription.destroy({ where: { id: id } });
            res.redirect("/subscription");
        } else {
            console.log(`Subscription not found: ${error}`.bgRed.white);
        }

    } catch (error) {
        console.log(`Error in Delete Subscription: ${error}`.bgRed.white);
    }
}
// Validation middleware
const validateFields = [
    body('title')
        .isString().withMessage('Title must be a string')
        .notEmpty().withMessage('Title is required')
        .trim().escape(),
    body('price')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('resolution')
        .optional().isString().withMessage('Resolution must be a string')
        .trim().escape(),
    body('sound_quality')
        .optional().isString().withMessage('Sound quality must be a string')
        .trim().escape(),
    body('supported_devices')
        .isArray({ min: 1 }).withMessage('Supported devices must be a non-empty array'),
    body('connection')
        .isString().withMessage('Connection type must be a string')
        .notEmpty().withMessage('Connection type is required')
        .trim().escape(),
    body('isActive')
        .isBoolean().withMessage('isActive must be a boolean value')
];



// Subscription API
const subscriptionAPI = async (req, res) => {
    try {
        let subscription = await getAllSubscription();

        subscription = subscription.filter(subscription => subscription.isActive);

        if (!subscription) {
            res.json({
                status: false,
                message: "No data found."
            })
        }
        res.json({
            status: true,
            data: subscription
        })
    } catch (error) {
        res.json({
            status: false,
            message: "Error in Subscription API."
        })
    }
}


// Fetch subscription
const getAllSubscription = async () => {
    return await Subscription.findAll({
        order: [['id', 'DESC']]
    });
}




module.exports = {
    subscription,

    displaySubscriptionPage,
    addOrEditSubscription,
    deleteSubscription,
    validateFields,

    subscriptionAPI,
}