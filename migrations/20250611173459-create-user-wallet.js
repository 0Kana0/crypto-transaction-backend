'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userwallet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      crypto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'crypto',
          key: 'id'
        }
      },
      crypto_balance: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      crypto_balance_inorder: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userwallet');
  }
};