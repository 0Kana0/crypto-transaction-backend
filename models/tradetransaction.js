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
      // Model ที่มีตัวเเปรใน TradeTransaction
      TradeTransaction.belongsTo(models.TradeMarket, {
        foreignKey: 'trademarket_id',
        as: 'trademarket'
      });
      TradeTransaction.belongsTo(models.Crypto, {
        foreignKey: 'crypto_id',
        as: 'crypto'
      });
      TradeTransaction.belongsTo(models.Currency, {
        foreignKey: 'currency_id',
        as: 'currency'
      });
      TradeTransaction.belongsTo(models.User, {
        foreignKey: 'trader_id',
        as: 'trader'
      });
      TradeTransaction.belongsTo(models.User, {
        foreignKey: 'customer_id',
        as: 'recipient'
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