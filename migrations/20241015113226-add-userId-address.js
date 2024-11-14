'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'address',
      'user_Id',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    ),
      await queryInterface.addColumn(
        'address',
        'fullName',
        {
          type: Sequelize.STRING,
          allowNull: false,
        }
      ),
      await queryInterface.addColumn(
        'address',
        'number',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('address', 'user_Id');
    await queryInterface.removeColumn('address', 'fullName');
    await queryInterface.removeColumn('address', 'number');
  }
};
