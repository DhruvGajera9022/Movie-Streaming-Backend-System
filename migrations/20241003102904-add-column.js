'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'number',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      }
    ),
      await queryInterface.addColumn(
        'users',
        'gender',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'number',
        }
      ),
      await queryInterface.addColumn(
        'users',
        'dob',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'gender',
        }
      ),
      await queryInterface.addColumn(
        'users',
        'hobbies',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'dob',
        }
      ),
      await queryInterface.addColumn(
        'users',
        'image',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'hobbies',
        }
      )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'number'),
      await queryInterface.removeColumn('users', 'gender'),
      await queryInterface.removeColumn('users', 'dob'),
      await queryInterface.removeColumn('users', 'hobbies'),
      await queryInterface.removeColumn('users', 'image')
  }
};
