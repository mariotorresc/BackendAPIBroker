'use strict';
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
    proposal_id: DataTypes.STRING,
    stock_id: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Proposal',
  });
  return Proposal;
};