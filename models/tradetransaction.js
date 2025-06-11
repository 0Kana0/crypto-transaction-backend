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
    }
  }
  TradeTransaction.init({
    fiat_amount: DataTypes.DOUBLE,
    crypto_amount: DataTypes.DOUBLE,
    bank_number: DataTypes.STRING,
    transaction_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TradeTransaction',
    tableName: 'tradetransaction'
  });
  return TradeTransaction;
};