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
    */
  

  await queryInterface.bulkInsert("users", [
    {
      username: "Paul Shcoles",
      email: "paulscholes@gmail.com",
      password: "Manchesterunited123",
      role: "HR",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
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
