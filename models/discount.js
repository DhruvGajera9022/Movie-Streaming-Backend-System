const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Discount = sequelize.define("discount", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    expire: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Discount