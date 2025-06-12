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
      TradeMarket.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      TradeMarket.belongsTo(models.Crypto, {
        foreignKey: 'crypto_id',
        as: 'crypto'
      });
      TradeMarket.belongsTo(models.Currency, {
        foreignKey: 'currency_id',
        as: 'currency'
      });

      TradeMarket.hasMany(models.TradeTransaction, {
        foreignKey: 'trademarket_id',
        as: 'tradetransaction'
      });
    }
  }
  TradeMarket.init({
    user_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    available: DataTypes.DOUBLE,
    min_trade: DataTypes.DOUBLE,
    payment: DataTypes.STRING,
    trade_type: DataTypes.STRING,
    trade_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TradeMarket',
    tableName: 'trademarket'
  });
  return TradeMarket;
};