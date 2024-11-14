const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    hobbies: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true,
    }

}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Users