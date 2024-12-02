const { sequelize } = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

const Role = sequelize.define("movies", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    overview: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adult: {
        type: Sequelize.BOOLEAN,
    },
    backdrop_path: {
        type: Sequelize.STRING,
    },
    genre_ids: {
        type: Sequelize.STRING,
        get() {
            const value = this.getDataValue('genre_ids');
            return value ? value.split(',') : [];
        },
    },
    original_language: {
        type: Sequelize.STRING,
    },
    original_title: {
        type: Sequelize.STRING,
    },
    popularity: {
        type: Sequelize.FLOAT,
    },
    poster_path: {
        type: Sequelize.STRING,
    },
    release_date: {
        type: Sequelize.STRING,
    },
    video: {
        type: Sequelize.BOOLEAN,
    },
    vote_average: {
        type: Sequelize.FLOAT,
    },
    vote_count: {
        type: Sequelize.DOUBLE,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Role