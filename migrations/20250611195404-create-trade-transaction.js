'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tradetransaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trademarket_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'trademarket',
          key: 'id'
        }
      },
      crypto_buyer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      crypto_seller_id: {
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
      currency_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'currency',
          key: 'id'
        }
      },
      fiat_amount: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      crypto_amount: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      bank_number: {
        type: Sequelize.STRING
      },
      transaction_status: {
        defaultValue: 'Pending',
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tradetransaction');
  }
};