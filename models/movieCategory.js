const { sequelize } = require("../config/config");
const { Sequelize } = require("sequelize");

const MovieCategory = sequelize.define("movie_category", {
    movieId: {
        type: Sequelize.INTEGER,
        references: {
            model: "movies",
            key: "id",
        },
    },
    categoryId: {
        type: Sequelize.INTEGER,
        references: {
            model: "category",
            key: "id",
        },
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = MovieCategory;
