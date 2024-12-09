const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const SliderImages = sequelize.define("sliderImages", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    language: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
        get() {
            const value = this.getDataValue('category');
            return value ? value.split(',') : [];
        },
    },
    release_date: {
        type: Sequelize.STRING,
    },
    duration: {
        type: Sequelize.STRING,
    },
    isPlay: {
        type: Sequelize.BOOLEAN,
    },
    isMoreInfo: {
        type: Sequelize.BOOLEAN,
    },
    isImage: {
        type: Sequelize.BOOLEAN,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
    },
    image: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = SliderImages