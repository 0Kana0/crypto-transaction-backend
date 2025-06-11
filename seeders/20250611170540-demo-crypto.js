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
    await queryInterface.bulkInsert(
      'crypto',
      [
        {
          id: 1,
          crypto_name: 'BTC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          crypto_name: 'ETH',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          crypto_name: 'XRP',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          crypto_name: 'DOGE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('crypto', null, {});
  }
};
