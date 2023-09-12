module.exports = {
  down: (queryInterface) => queryInterface.dropTable('users'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING(70),
      unique: true,
    },
<<<<<<< HEAD
=======
    money: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING(70),
    },
<<<<<<< HEAD
    money: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
=======
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    name: {
      allowNull: false,
      type: Sequelize.STRING(70),
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
};
