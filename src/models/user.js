/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

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

  user.beforeBulkCreate(async (users) => {
    const newUsers = Promise.all(
      users.map(async (us) => {
        if (us.changed('password')) {
          us.password = await bcrypt.hash(us.password, 10);
        }
        if (us.changed('email')) {
          us.email = us.email.toLowerCase();
          const user1 = await user.findOne({ where: { email: us.email } });
          if (user1) {
            const error = new Error('There is another account with this email');
            error.number = 422;
            throw error;
          }
        }
      })
    );
    return newUsers;
  });

  // PROTOTYPE FUNCTIONS
  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };
  return user;
};
