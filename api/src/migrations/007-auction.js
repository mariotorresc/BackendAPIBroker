/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Auctions');
  },
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Auctions', {
      auction_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      group_id: {
        type: Sequelize.INTEGER
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proposal_id: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      stock_id: {
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
