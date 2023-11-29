const {
  request, stock, user, company
} = require('../models');

async function SaveRequests(stockRequest) {
  try {
    const purchasedStock = await stock.findOne({
      where: { symbol: stockRequest.symbol },
    });
    const fromCompany = await company.findOne({
      where: { symbol: stockRequest.symbol },
    });
    const purchaserUser = await user.findOne({
      where: { email: stockRequest.email },
    });

    const dbRequest = await request.create({
      companyId: fromCompany?.id,
      depositToken: stockRequest?.deposit_token,
      groupId: stockRequest?.group_id,
      priceToPay: stock?.price,
      quantity: stockRequest?.quantity,
      seller: stockRequest?.seller,
      state: null,
      stockId: purchasedStock?.id,
      userId: purchaserUser?.id,
      uuid: stockRequest?.request_id,
      validated: false,
    });
    return dbRequest;
  } catch (error) {
    console.log(error);
  }
}

async function SaveExternalRequests(requestInfo) {
  try {
    const purchasedStock = await stock.findOne({
      where: { symbol: requestInfo.symbol },
    });
    const Company = await company.findOne({
      where: { symbol: requestInfo.symbol },
    });
    const dummy = await user.findOne({ where: { email: 'foo@uc.cl' } });

    const dbRequest = await request.create({
      companyId: Company?.id,
      depositToken: requestInfo?.deposit_token,
      groupId: requestInfo?.group_id,
      priceToPay: purchasedStock?.price,
      quantity: requestInfo?.quantity,
      seller: requestInfo?.seller,
      state: null,
      stockId: purchasedStock?.id,
      userId: dummy?.id,
      uuid: requestInfo?.request_id,
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
    await validatedRequest.update({
      state: validationInfo.valid,
      validated: true,
    });
  } catch (error) {
    console.log('Error al validar');
    console.log(error);
  }
}

module.exports = {
  SaveExternalRequests,
  SaveRequests,
  ValidateRequest,
};
