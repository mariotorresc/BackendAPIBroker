/* eslint-disable camelcase */
/* eslint-disable radix */
const KoaRouter = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const tx = require('../utils/trx');
const { PublishNewRequest, PublishValidation } = require('../requests/mqttRequests');
const { SaveRequests } = require('../helpers/requests');
const { UpdateWallet } = require('../helpers/purchases');
require('dotenv').config();

const router = new KoaRouter();

router.get('get-all-stocks', '/', async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const itemsPerPage = parseInt(ctx.query.size) || 25;
  try {
    const { count, rows } = await ctx.orm.stock.findAndCountAll({
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['lastUpdate', 'DESC']],
    });
    ctx.body = {
      currentPage: page,
      stocks: rows,
      totalItems: count,
      totalPages: Math.ceil(count / itemsPerPage),
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// get stocks admin

router.get('get-all-stocks-admin', '/stocks-admin', async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const itemsPerPage = parseInt(ctx.query.size) || 25;
  try {
    const adminUserStocks = await models.user.findOne({
      include: [models.stock],
      where: {
        admin: true,
      }, // Include the associated stocks
    });
    const adminStocks = adminUserStocks.stocks;
    const { count, rows } = await ctx.orm.stock.findAndCountAll({
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      order: [['lastUpdate', 'DESC']],
      where: { id: adminStocks.map((stock) => stock.id), },
    });
    ctx.body = {
      currentPage: page,
      stocks: rows,
      totalItems: count,
      totalPages: Math.ceil(count / itemsPerPage),
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.get('get-stock-by-stockId', '/:symbol', async (ctx) => {
  const { symbol } = ctx.params;
  const page = parseInt(ctx.query.page) || 1;
  const itemsPerPage = parseInt(ctx.query.size) || 25;
  try {
    const stock = await ctx.orm.stock.findOne({
      attributes: ['symbol', 'id'],
      include: {
        model: ctx.orm.stocksHistories,
      },
      where: { symbol },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }
    const stockHistories = stock.stocksHistories.reverse();
    const total = stock.stocksHistories.length;
    const pageReports = stockHistories.slice(
      (page - 1) * itemsPerPage,
      itemsPerPage * page
    );
    const totalPages = Math.ceil(total / itemsPerPage);
    ctx.body = {
      currentPage: page,
      id: stock.id,
      stocksHistories: pageReports,
      symbol: stock.symbol,
      totalItems: total,
      totalPages,
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('/buy-stock-admin', '/admin', async (ctx) => {
  try {
    // Parse data from the request
    const { email, stockId, amount } = ctx.request.body;

    // Find the user and stock
    const user = await models.user.findByOne({ where: { email } });
    const stock = await models.stock.findByPk(stockId);
    const userId = user.id;

    // Check if the user and stock exist
    if (!user || !stock) {
      ctx.status = 404;
      ctx.body = { message: 'User or stock not found' };
      return;
    }

    // Check if the admin user has sufficient stocks
    const adminUser = await models.user.findOne({
      include: [models.stock],
      where: {
        admin: true,
      }, // Include the associated stocks
    });

    const adminStock = adminUser.stocks.find((adminStock) => adminStock.id === stock.id);
    const { companyId } = stock;

    if (!adminStock || adminStock.amount < amount) {
      ctx.status = 400;
      ctx.body = { message: 'Insufficient stocks available for purchase' };
      return;
    }

    // Create a new userStock entry for the user
    const userStock = await models.userStock.create({
      amount,
      companyId,
      stockId,
      userId,
    });

    // Update the admin's stock amount
    adminStock.amount -= amount;
    await adminStock.save();

    ctx.status = 200;
    ctx.body = { message: 'Stock purchased successfully', userStock };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
  }
});

// receive a purchase from the endpoint /stocks/purchase
router.post('/post-stock-purchase', '/purchase', async (ctx) => {
  const {
    symbol, quantity, groupId, email, priceToPay
  } = ctx.request.body;
  try {
    const stock = await ctx.orm.stock.findOne({
      where: { symbol },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }

    // Create the request in the database with validation and state null
    const stockRequest = {
      datetime: new Date(),
      deposit_token: '',
      email,
      group_id: groupId,
      priceToPay,
      quantity,
      request_id: uuidv4(),
      seller: 0,
      symbol,
    };

    // Create the DB request
    const request = await SaveRequests(stockRequest);

    // Mandar solicitud de pago webpay
    const randomInt = Math.floor(10000 + Math.random() * 90000);
    const trx = await tx.create(
      `GRUPO3-${request.id}${randomInt}`,
      'test-iic2173',
      priceToPay,
      process.env?.REDIRECT_URL || 'http://localhost:3001/purchaseCompleted'
    );
    // Update DB request with deposit token
    await request.update({ depositToken: trx.token }).catch((err) => {
      console.log('Error al actualizar la request', err);
    });

    stockRequest.deposit_token = trx.token;

    // Send a message to the channel stocks/request
    PublishNewRequest(stockRequest);

    ctx.status = 200;
    ctx.body = trx;
  } catch (err) {
    console.error(err);
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// transacyion-details
router.post('/transaction-details', '/transaction-details', async (ctx) => {
  const { token_ws } = ctx.request.body;
  if (!token_ws || token_ws === '') {
    // actualizamos de la request en la db
    const lastRequest = await ctx.orm.request.findOne({
      order: [['createdAt', 'DESC']],
    });
    await lastRequest.update({
      state: false,
      validated: true,
    });
    // Enviar el fallo por el canal de validaciones
    PublishValidation({
      group_id: lastRequest.groupId,
      request_id: lastRequest.uuid,
      seller: lastRequest.seller,
      valid: false,
    });
    ctx.body = {
      message: 'Transaccion anulada por el usuario',
    };
    ctx.status = 200;
    return;
  }
  // verificamos el estado de la transaccion
  const confirmedTx = await tx.commit(token_ws);
  if (confirmedTx.response_code !== 0) {
    // WP Rechaza la transaccio
    // actualizamos de la request en la db
    const request = await ctx.orm.request.findOne({
      where: { depositToken: token_ws },
    });
    await request.update({
      state: false,
      validated: true,
    });
    // Enviar el fallo por el canal de validaciones
    await PublishValidation({
      group_id: request.groupId,
      request_id: request.uuid,
      seller: request.seller,
      valid: false,
    });
    ctx.body = {
      message: 'Transaccion ha sido rechazada',
    };
    ctx.status = 200;
    return;
  }
  // Se acepto la transaccion y se actualiza la BD
  const request = await ctx.orm.request.findOne({
    where: { depositToken: token_ws },
  });
  await request.update({
    state: true,
    validated: true,
  });
  await UpdateWallet(token_ws);
  // Enviar el exito por el canal de validaciones
  PublishValidation({
    group_id: request.groupId,
    request_id: request.uuid,
    seller: request.seller,
    valid: true,
  });

  ctx.status = 200;
  ctx.body = {
    message: 'Transaccion ha sido aceptada',
  };
});

module.exports = router;
