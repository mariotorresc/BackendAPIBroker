module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocks'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('stocks', {
<<<<<<< HEAD
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    currency: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
=======
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
<<<<<<< HEAD
    lastUpdate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    price: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    shortName: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    source: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
=======
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    symbol: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
    },
<<<<<<< HEAD
=======
    lastUpdate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    shortName: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    currency: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
    price: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    source: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
<<<<<<< HEAD
=======
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
  }),
};
