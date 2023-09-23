const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class request extends Model {}
  request.init(
    {
      accepted: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      rejected: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      uuid: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      validated: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      modelName: 'request',
      paranoid: true,
      sequelize,
    }
  );
  request.associate = function associate(models) {
    request.belongsTo(models.stock, {
      foreignKey: 'stockId',
    });
    request.belongsTo(models.user, {
      foreignKey: 'userId',
    });
    request.belongsTo(models.company, {
      foreignKey: 'companyId',
    });
  };
  return request;
};
