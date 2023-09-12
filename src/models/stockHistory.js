const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stocksHistories extends Model {}
  stocksHistories.init(
    {
      currency: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      source: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'stocksHistories',
      paranoid: true,
      sequelize,
    },
  );
  stocksHistories.associate = function associate(models) {
    stocksHistories.belongsTo(models.stock, {
      foreignKey: 'stockId',
    });
  };
  return stocksHistories;
};
