module.exports = {
  down: (queryInterface) => queryInterface.dropTable('stocksHistories'),

  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('stocksHistories', {
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
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      source: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      stockId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'stocks',
        },
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
};
