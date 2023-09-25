const { request, stock, user, company } = require('../models');

async function SaveRequests(stockRequest) {
  try {
    const purchasedStock = await stock.findOne({ where: { symbol: stockRequest.symbol } });
    const fromCompany = await company.findOne({ where: { symbol: stockRequest.symbol } });
    // get user from auth token
    // const purchaserUser = await company.findOne({ where: { symbol: stockRequest.symbol } });
    const purchaserUser = {id: 1}; // Hardcodeado, cambiar por la linea de arriba cuando este listo el auth

    const newRequest = await request.create({
      accepted: false, // cambiarle nombre a status ( string: ['accepted', 'rejected', 'processing'] )
      depositToken: stockRequest.deposit_token,
      groupId: stockRequest.group_id,
      rejected: false, // quitar este parametro y colocar el nuevo parametro (quantity: stockRequest.quantity) de tipo (number)
      seller: stockRequest.seller,
      uuid: stockRequest.request_id,
      validated: false, // cuando se reciba la validacion actualizar a true,
      companyId: fromCompany.id,
      stockId: purchasedStock.id,
      userId: purchaserUser.id,
    });
    console.log('Request passed to DB!');
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  SaveRequests,
};
