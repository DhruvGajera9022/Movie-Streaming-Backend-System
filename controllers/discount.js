const Discount = require("../models/discount");
const { check, validationResult } = require('express-validator');
const fs = require('fs');
require("dotenv").config();
const dateHelper = require("../helpers/date_formator");


// To display category page
const discount = async (req, res) => {
    let allDiscount = await getAllDiscount();

    allDiscount = allDiscount.map(discount => {
        return {
            ...discount,
            id: discount.id,
            name: discount.name,
            description: discount.description,
            type: discount.type,
            value: discount.value,
            formattedDate: dateHelper.formatDate(discount.expire),
            image: discount.image,
            isActive: discount.isActive,
        }
    });

    res.render("discount/discount", { title: 'Discount', allDiscount });
}



// To render page according to add or edit request
const displayDiscountPage = async (req, res) => {
    // Operation on discount
    const id = req.params.id;

    // Fetch user data for the given ID
    if (id) {
        const discount = await Discount.findOne({ where: { id } });
        if (discount) {
            res.render("discount/add_discount", {
                title: "Edit Discount",
                discount: discount
            });
        } else {
            return res.send("Discount not found.");
        }
    } else {
        // Render the page for adding a new discount
        res.render("discount/add_discount", {
            title: "Add Discount",
            discount: null,
        });
    }
}
// To add-edit category
const addOrEditDiscount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { id, name, description, type, value, expire, active, image_old } = req.body;
    let image = req.file ? req.file.filename : image_old;

    if (req.file && image_old) {
        fs.unlink(`assets/img/discountImages/${image_old}`, (err) => {
            if (err) {
                console.error("Failed to delete old image:", err);
            }
        });
    }

    active = active === "on";

    if (id) {
        // edit discount
        const isDiscountUpdated = await Discount.update({
            name: name,
            description: description,
            type: type,
            value: value,
            expire: expire,
            image: image,
            isActive: active,
        }, { where: { id: id } });
        if (isDiscountUpdated > 0) {
            res.redirect("/discount");
        }
    } else {
        // add discount
        const isDiscountAdded = await Discount.create({
            name: name,
            description: description,
            type: type,
            value: value,
            expire: expire,
            image: image,
            isActive: active,
        });
        if (isDiscountAdded) {
            res.redirect("/discount");
        }
    }
}
// To delete discount
const deleteDiscount = async (req, res) => {
    const id = req.params.id;

    const discount = await Discount.findOne({
        attributes: ["image"],
        where: { id },
    });

    if (!discount) {
        return res.send("Discount not found");
    }

    const image = discount.image;

    await Discount.destroy({ where: { id } });

    if (image) {
        const imagePath = `assets/img/discountImages/${image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image:", err);
            }
        });
    }
    res.redirect("/discount");
}
// discount validation rules
const validateDiscount = [
    check('name')
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
    check('type')
        .notEmpty().withMessage('Type is required.')
        .isIn(['Discount', 'Flat']).withMessage('Type must be either "percentage" or "flat".'),
    check('value')
        .notEmpty().withMessage('Value is required.')
        .isFloat({ gt: 0 }).withMessage('Value must be a number greater than 0.'),
    check('expire')
        .optional()
        .isISO8601().withMessage('Expire must be a valid date.'),
];



// To get all discount
const getAllDiscount = async (req, res) => {
    return await Discount.findAll({
        order: [['id', 'DESC']]
    });
}


// get API for discount
const discountAPI = async (req, res) => {
    let discount = await getAllDiscount();

    let baseURL = `${process.env.URL}${process.env.PORT}`;

    discount = discount.filter(discount => discount.isActive);

    discount = discount.map((discount) => {
        return {
            id: discount.id,
            name: discount.name,
            description: discount.description,
            type: discount.type,
            value: discount.value,
            expire: discount.value,
            image: discount.image ? `${baseURL}/img/discountImages/${discount.image}` : null,
            isActive: discount.isActive,
        }
    });

    return res.json({
        status: true,
        data: discount,
    });

}


// 
const singleDiscountAPI = async (req, res) => {
    const discountId = req.query.discountId;

    const discountData = await Discount.findOne({ where: { id: discountId } });

    res.json({ discountPrice: discountData.value });

}

module.exports = {
    discount,

    displayDiscountPage,
    addOrEditDiscount,
    deleteDiscount,
    validateDiscount,

    discountAPI,
    singleDiscountAPI,
}