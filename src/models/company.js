const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class company extends Model {}
  company.init(
    {
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      symbol: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      modelName: 'company',
      paranoid: true,
      sequelize,
    }
  );
  company.associate = function associate(models) {
    company.hasMany(models.request, {
      foreignKey: 'companyId',
    });
    company.hasMany(models.userStock, {
      foreignKey: 'companyId',
    });
  };
  return company;
};
