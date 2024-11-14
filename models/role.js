const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Role = sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Role