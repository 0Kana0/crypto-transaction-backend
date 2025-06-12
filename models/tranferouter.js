'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TranferOuter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Model ที่มีตัวเเปรใน TranferOuter
      TranferOuter.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'user'
      });
      TranferOuter.belongsTo(models.Crypto, {
        foreignKey: 'crypto_id',
        as: 'crypto'
      });
    }
  }
  TranferOuter.init({
    sender_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    tranfer_amount: DataTypes.DOUBLE,
    address: DataTypes.STRING,
    network: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TranferOuter',
    tableName: 'tranferouter'
  });
  return TranferOuter;
};