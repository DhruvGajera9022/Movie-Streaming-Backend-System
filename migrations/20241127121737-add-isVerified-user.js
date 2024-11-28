'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'emailToken',
      {
        type: Sequelize.STRING,
      }
    ),
      await queryInterface.addColumn(
        'users',
        'isVerified',
        {
          type: Sequelize.BOOLEAN,
        }
      )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'emailToken');
    await queryInterface.removeColumn('users', 'isVerified');
  }
};
