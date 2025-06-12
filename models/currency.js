'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // เชื่อมกับ TranferOuter
      Currency.hasMany(models.TradeMarket, {
        foreignKey: 'currency_id',
        as: 'trademarket'
      });
      // เชื่อมกับ TradeTransaction
      Currency.hasMany(models.TradeTransaction, {
        foreignKey: 'currency_id',
        as: 'tradetransaction'
      });
    }
  }
  Currency.init({
    currency_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Currency',
    tableName: 'currency'
  });
  return Currency;
};