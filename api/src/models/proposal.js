const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Proposal.init({
    auction_id: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    proposal_id: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    stock_id: DataTypes.STRING
  }, {
    modelName: 'Proposal',
    sequelize,
  });
  return Proposal;
};
