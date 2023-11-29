module.exports = {
  down: (queryInterface) => queryInterface.dropTable('users'),

  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      admin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
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
