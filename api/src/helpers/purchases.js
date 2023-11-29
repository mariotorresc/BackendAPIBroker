const {
  request, stock, user, userStock
} = require('../models');

async function UpdateWallet(token_ws) {
  try {
    const thisRequest = await request.findOne({
      where: { depositToken: token_ws },
    });
    const wallet = await userStock.create({
      amount: thisRequest.quantity,
      companyId: thisRequest.companyId,
      stockId: thisRequest.stockId,
      userId: thisRequest.userId
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  UpdateWallet,
};
