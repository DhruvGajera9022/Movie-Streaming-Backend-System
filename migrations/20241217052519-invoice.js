'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscriptionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      validFrom: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      validTo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice');
  }
};
