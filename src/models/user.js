<<<<<<< HEAD
/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
=======
const { Model } = require('sequelize');
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))

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
<<<<<<< HEAD
      money: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
=======
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
<<<<<<< HEAD
=======
      money: {
        allowNull: false,
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: true,
        },
      },
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
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
<<<<<<< HEAD
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
=======
    },
  );
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
  return user;
};
