module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocks'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('stocks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    symbol: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
    },
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
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
};
