'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // เชื่อมกับ TradeMarket
      User.hasMany(models.TradeMarket, {
        foreignKey: 'user_id',
        as: 'trademarket'
      });
      // เชื่อมกับ TradeTransaction
      User.hasMany(models.TradeTransaction, {
        foreignKey: 'trader_id',
        as: 'tradertranfer'
      });
      User.hasMany(models.TradeTransaction, {
        foreignKey: 'customer_id',
        as: 'customertranfer'
      });
      // เชื่อมกับ Tranfer
      User.hasMany(models.Tranfer, {
        foreignKey: 'sender_id',
        as: 'sendertranfer'
      });
      User.hasMany(models.Tranfer, {
        foreignKey: 'recipient_id',
        as: 'recipienttranfer'
      });
      // เชื่อมกับ TranferOuter
      User.hasMany(models.TranferOuter, {
        foreignKey: 'sender_id',
        as: 'tranferouter'
      });
    }
  }
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};