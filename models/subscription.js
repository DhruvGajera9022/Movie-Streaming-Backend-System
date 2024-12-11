const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Subscription = sequelize.define("subscription", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    resolution: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sound_quality: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    supported_devices: {
        type: Sequelize.STRING,
    },
    connection: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Subscription