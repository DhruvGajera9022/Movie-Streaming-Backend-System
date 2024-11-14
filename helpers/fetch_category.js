const Category = require("../models/category");

const fetchCategory = async (id) => {
    const category = await Category.findOne({ where: id });
    return category ? category.name : 'No category';
};

module.exports = {
    fetchCategory,
};
