module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocks'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('stocks', {
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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
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
    symbol: {
      allowNull: false,
      type: Sequelize.STRING(50),
      unique: true,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
};
