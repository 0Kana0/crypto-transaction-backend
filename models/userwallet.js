'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Model ที่มีตัวเเปรใน UserWallet
      UserWallet.belongsTo(models.Crypto, {
        foreignKey: 'crypto_id',
        as: 'crypto'
      });
    }
  }
  UserWallet.init({
    user_id: DataTypes.INTEGER,
    crypto_id: DataTypes.INTEGER,
    crypto_balance: DataTypes.DOUBLE,
    crypto_balance_inorder: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'UserWallet',
    tableName: 'userwallet'
  });
  return UserWallet;
};