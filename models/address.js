const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Address = sequelize.define("address", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    no: {
        type: Sequelize.STRING,
        after: 'id',
    },
    street: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    zipCode: {
        type: Sequelize.INTEGER,
    },
    landMark: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    },
    isDefault: {
        type: Sequelize.BOOLEAN,
    },
    user_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Address