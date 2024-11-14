'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'role',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'image',
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'role')
  }
};
