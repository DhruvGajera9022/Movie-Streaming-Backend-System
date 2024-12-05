'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
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
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};
