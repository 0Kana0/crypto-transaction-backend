'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TradeMarket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TradeMarket.init({
    userwallet_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    available: DataTypes.DOUBLE,
    min_trade: DataTypes.DOUBLE,
    max_trade: DataTypes.DOUBLE,
    payment: DataTypes.STRING,
    trade_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TradeMarket',
    tableName: 'trademarket'
  });
  return TradeMarket;
};