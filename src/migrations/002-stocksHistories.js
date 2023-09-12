module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocksHistories'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('stocksHistories', {
<<<<<<< HEAD
    createdAt: {
      allowNull: true,
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
    price: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    source: {
      allowNull: true,
      type: Sequelize.STRING(50),
    },
=======
>>>>>>> 22dc1b0 (feat(cli, users, prettier, eslint))
    stockId: {
      allowNull: false,
      references: {
        key: 'id',
        model: 'stocks',
      },
      type: Sequelize.INTEGER,
    },
<<<<<<< HEAD
=======
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
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
