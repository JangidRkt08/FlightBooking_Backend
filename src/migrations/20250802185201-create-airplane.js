// migration is like you git add but not commit (Versions of table)

'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */

  // npx sequelize db:migrate    <----------------
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airplanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelNumber: {
        type: Sequelize.STRING,
      allowNull: false,
      defaultValue:''
      },
      capacity: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  // npx sequelize db:migrate:undo    <----------------
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Airplanes');
  }
};