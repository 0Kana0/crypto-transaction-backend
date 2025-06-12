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
      Crypto.hasMany(models.UserWallet, {
        foreignKey: 'crypto_id',
        as: 'userwallet'
      });
      Crypto.hasMany(models.TradeMarket, {
        foreignKey: 'crypto_id',
        as: 'trademarket'
      });
      Crypto.hasMany(models.Tranfer, {
        foreignKey: 'crypto_id',
        as: 'tranfer'
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