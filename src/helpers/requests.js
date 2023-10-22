const {
  request, stock, user, company
} = require('../models');

async function SaveRequests(stockRequest) {
  try {
    const purchasedStock = await stock.findOne({
      where: { symbol: stockRequest.symbol },
    });
    const fromCompany = await company.findOne({ where: { symbol: stockRequest.symbol } });
    const purchaserUser = await user.findOne({ where: { email: stockRequest.email } });

    const dbRequest = await request.create({
      // cambiarle nombre a status ( string: ['accepted', 'rejected', 'processing'] )
      accepted: false,
      companyId: fromCompany.id,
      depositToken: stockRequest.deposit_token,
      groupId: stockRequest.group_id,

      quantity: stockRequest.quantity,
      // rejected, es necesario? revisar en la proxima entrega
      rejected: false,
      seller: stockRequest.seller,
      stockId: purchasedStock.id,
      userId: purchaserUser.id,
      uuid: stockRequest.request_id,
      validated: false,
    });
    return dbRequest;
  } catch (error) {
    console.log(error);
  }
}

async function ValidateRequest(validationInfo) {
  try {
    const validatedRequest = await request.findOne({
      include: {
        model: stock,
      },
      where: { uuid: validationInfo.request_id },
    });
    const buyer = await validatedRequest.getUser();
    let isAccepted;
    if (validationInfo.valid) {
      isAccepted = true;
    } else {
      isAccepted = false;
    }
    await validatedRequest.update({
      accepted: isAccepted,
      rejected: !isAccepted,
      validated: true,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  SaveRequests,
  ValidateRequest,
};
