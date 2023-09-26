module.exports = {
  down: (queryInterface) => queryInterface.dropTable('requests'),

  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('requests', {
      accepted: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
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
      depositToken: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      groupId: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rejected: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seller: {
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
      userId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      validated: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
    }),
};
