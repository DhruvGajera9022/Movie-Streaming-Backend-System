'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      no: {
        type: Sequelize.INTEGER,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};
