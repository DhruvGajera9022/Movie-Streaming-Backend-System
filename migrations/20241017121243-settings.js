'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      linkedIn: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      app_store: {
        type: Sequelize.STRING,
      },
      play_store: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      privacy_policy: {
        type: Sequelize.STRING,
      },
      term_condition: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('settings');
  }
};