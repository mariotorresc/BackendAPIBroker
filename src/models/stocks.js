const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stock extends Model {}
  stock.init(
    {
      currency: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastUpdate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      price: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      shortName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      source: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      symbol: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      modelName: 'stock',
      paranoid: true,
      sequelize,
    }
  );
  stock.associate = function associate(models) {
    stock.hasMany(models.stocksHistories, {
      foreignKey: 'stockId',
    });
  };
  return stock;
};
