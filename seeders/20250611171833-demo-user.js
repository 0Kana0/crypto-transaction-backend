'use strict';
const bcrypt = require('bcrypt');

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
      'user',
      [
        {
          user_name: 'nakano miku',
          email: 'nakanomiku@gmail.com',
          password: await bcrypt.hash('11111111', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_name: 'nakano nino',
          email: 'nakanonino@gmail.com',
          password: await bcrypt.hash('22222222', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_name: 'nakano itsuki',
          email: 'nakanoitsuki@gmail.com',
          password: await bcrypt.hash('33333333', 10),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'userwallet',
      [
        {
          user_id: 1,
          crypto_id: 1,
          crypto_balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          crypto_id: 2,
          crypto_balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          crypto_id: 3,
          crypto_balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          crypto_id: 4,
          crypto_balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          crypto_id: 1,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          crypto_id: 2,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          crypto_id: 3,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          crypto_id: 4,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          crypto_id: 1,
          crypto_balance: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          crypto_id: 2,
          crypto_balance: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          crypto_id: 3,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          crypto_id: 4,
          crypto_balance: 0,
          createdAt: new Date(),
          updatedAt: new Date()
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
    await queryInterface.bulkDelete('userwallet', null, {});
    await queryInterface.bulkDelete('user', null, {});
  }
};
