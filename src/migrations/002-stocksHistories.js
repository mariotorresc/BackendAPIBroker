module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocksHistories'),

  up: (queryInterface, Sequelize) => queryInterface.createTable('stocksHistories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    stockId: {
      allowNull: false,
      references: {
        key: 'id',
        model: 'stocks',
      },
      type: Sequelize.INTEGER,
    },
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
