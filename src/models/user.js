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
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      money: {
        allowNull: false,
        type: DataTypes.FLOAT,
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
    },
  );
  return user;
};
