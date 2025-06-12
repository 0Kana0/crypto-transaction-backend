'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tranfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Model ที่มีตัวเเปรใน Tranfer
      Tranfer.belongsTo(models.User, {
        foreignKey: 'sender_id',
        as: 'sender'
      });
      Tranfer.belongsTo(models.User, {
        foreignKey: 'recipient_id',
        as: 'recipient'
      });
      Tranfer.belongsTo(models.Crypto, {
        foreignKey: 'crypto_id',
        as: 'crypto'
      });
    }
  }
  Tranfer.init({
    sender_id: DataTypes.INTEGER,
    recipient_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    tranfer_amount: DataTypes.DOUBLE,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tranfer',
    tableName: 'tranfer'
  });
  return Tranfer;
};