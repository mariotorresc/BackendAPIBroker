const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stock extends Model {}
  stock.init(
    {
      symbol: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      lastUpdate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      shortName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
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
      modelName: 'stock',
      paranoid: true,
      sequelize,
    },
  );
  stock.associate = function associate(models) {
    stock.hasMany(models.stocksHistories, {
      foreignKey: 'stockId',
    });
  };
  return stock;
};
