const Category = require("../models/category");
const { check, validationResult } = require('express-validator');
const fs = require('fs');
require("dotenv").config();



// To display category page
const categories = async (req, res) => {
    let allData = await getAllCategory();
    res.render("category/category", { title: "Category", allData });
}



// To render page according to add or edit request
const displayCategoryPage = async (req, res) => {
    // Operation on category
    const id = req.params.id;

    // Fetch user data for the given ID
    if (id) {
        const category = await Category.findOne({ where: { id } });
        if (category) {
            res.render("category/add_category", {
                title: "Edit Category",
                category: category
            });
        } else {
            return res.status(404).send("Category not found.");
        }
    } else {
        // Render the page for adding a new user
        res.render("category/add_category", {
            title: "Add Category",
            category: null,
        });
    }
}
// To add-edit category
const addOrEditCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { id, name, active } = req.body;

    active = active === "on";

    if (id) {
        // edit category
        const isCategoryUpdated = await Category.update({
            name: name,
            isActive: active,
        }, { where: { id: id } });
        if (isCategoryUpdated > 0) {
            res.redirect("/category");
        }
    } else {
        // add category
        const isCategoryAdded = await Category.create({
            name: name,
            isActive: active,
        });
        if (isCategoryAdded) {
            res.redirect("/category");
        }
    }
}
// To delete category
const deleteCategory = async (req, res) => {
    const id = req.params.id;

    const category = await Category.findOne({
        where: { id },
    });

    if (!category) {
        return res.status(404).send("Category not found");
    }

    await Category.destroy({ where: { id } });
    res.redirect("/category");
}
// To validate category fields
const categoryValidationRules = [
    check('name')
        .trim()
        .isLength({ min: 1 }).withMessage('Name is required.'),
];



// To display all category in product form into dropdown
const getCategory = async (req, res) => {
    const categories = await getAllCategory();
    res.json(categories);
};


// Fetch category
const getAllCategory = async () => {
    return await Category.findAll({
        order: [['id', 'DESC']]
    });
}


// API category
const categoriesAPI = async (req, res) => {
    let categories = await getAllCategory();

    categories = categories.filter(category => category.isActive);

    categories = categories.map((category) => {
        return {
            id: category.id,
            name: category.name,
        }
    });

    return res.json({
        status: true,
        data: categories,
    });
}


module.exports = {
    categories,

    getCategory,

    displayCategoryPage,
    addOrEditCategory,
    deleteCategory,
    categoryValidationRules,

    categoriesAPI,
}