'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TradeTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TradeTransaction.belongsTo(models.TradeMarket, {
        foreignKey: 'trademarket_id',
        as: 'trademarket'
      });
    }
  }
  TradeTransaction.init({
    trademarket_id: DataTypes.INTEGER,
    trader_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    fiat_amount: DataTypes.DOUBLE,
    crypto_amount: DataTypes.DOUBLE,
    bank_number: DataTypes.STRING,
    trade_type: DataTypes.STRING,
    transaction_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TradeTransaction',
    tableName: 'tradetransaction'
  });
  return TradeTransaction;
};