const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }

}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Category