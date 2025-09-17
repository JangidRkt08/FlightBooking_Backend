'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
     * 
    */

    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 1,
        row: 1,
        col: "A",
        // type: "Business",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 1,
        row: 1,
        col: "B",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 1,
        col: "C",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 1,
        col: "D",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 1,
        col: "E",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 1,
        col: "F",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 1,
        row: 2,
        col: "A",
        // type: "Business",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 1,
        row: 2,
        col: "B",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 2,
        col: "C",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 2,
        col: "D",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 2,
        col: "E",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        airplaneId: 1,
        row: 2,
        col: "F",
        // type: "Economy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
