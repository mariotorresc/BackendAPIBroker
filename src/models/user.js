/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {}
  user.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { msg: 'Wrong Email format' },
          notEmpty: true,
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      money: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      modelName: 'user',
      paranoid: true,
      sequelize,
    }
  );
  user.associate = function associate(models) {
    user.hasMany(models.request, {
      foreignKey: 'userId',
    });
    user.hasMany(models.userStock, {
      foreignKey: 'userId',
    });
  };
  return user;
};
