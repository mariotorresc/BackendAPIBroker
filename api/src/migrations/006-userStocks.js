module.exports = {
  down: (queryInterface) => queryInterface.dropTable('userStocks'),

  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('userStocks', {
      amount: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      companyId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'companies',
        },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
      userId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.INTEGER,
      },
    }),
};
