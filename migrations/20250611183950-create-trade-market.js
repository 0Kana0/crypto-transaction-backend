'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trademarket', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userwallet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'userwallet',
          key: 'id'
        }
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
      currency_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'currency',
          key: 'id'
        }
      },
      price: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      available: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      min_trade: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      max_trade: {
        defaultValue: 0,
        type: Sequelize.DOUBLE
      },
      payment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trade_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trade_status: {
        allowNull: false,
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
    await queryInterface.dropTable('trademarket');
  }
};