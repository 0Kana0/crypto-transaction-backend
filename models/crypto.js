'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // เชื่อมกับ UserWallet
      Crypto.hasMany(models.UserWallet, {
        foreignKey: 'crypto_id',
        as: 'userwallet'
      });
      // เชื่อมกับ TradeMarket
      Crypto.hasMany(models.TradeMarket, {
        foreignKey: 'crypto_id',
        as: 'trademarket'
      });
      // เชื่อมกับ TradeTransaction
      Crypto.hasMany(models.TradeTransaction, {
        foreignKey: 'crypto_id',
        as: 'tradetransaction'
      });
      // เชื่อมกับ Tranfer
      Crypto.hasMany(models.Tranfer, {
        foreignKey: 'crypto_id',
        as: 'tranfer'
      });
      // เชื่อมกับ TranferOuter
      Crypto.hasMany(models.TranferOuter, {
        foreignKey: 'crypto_id',
        as: 'tranferouter'
      });
    }
  }
  Crypto.init({
    crypto_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Crypto',
    tableName: 'crypto'
  });
  return Crypto;
};