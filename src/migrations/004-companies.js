module.exports = {
  down: (queryInterface) => queryInterface.dropTable('companies'),

  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('companies', {
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
      name: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      symbol: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
};
