const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userStock extends Model {}
  userStock.init(
    {
      amount: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      modelName: 'userStock',
      paranoid: true,
      sequelize,
    }
  );
  userStock.associate = function associate(models) {
    userStock.belongsTo(models.stock, {
      foreignKey: 'stockId',
    });
    userStock.belongsTo(models.user, {
      foreignKey: 'userId',
    });
    userStock.belongsTo(models.company, {
      foreignKey: 'companyId',
    });
  };
  return userStock;
};
