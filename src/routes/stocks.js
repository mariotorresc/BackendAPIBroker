/* eslint-disable radix */
const KoaRouter = require('koa-router');

const router = new KoaRouter();
const { v4: uuidv4 } = require('uuid');
const mqttClientSender = require('../../mqttSender');

router.get('get-all-stocks', '/', async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const itemsPerPage = parseInt(ctx.query.size) || 25;
  try {
    const { count, rows } = await ctx.orm.stock.findAndCountAll({
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
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
        limit: itemsPerPage,
        model: ctx.orm.stocksHistories,
        offset: (page - 1) * itemsPerPage,
      },
      where: { symbol },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }

    ctx.body = {
      currentPage: page,
      id: stock.id,
      stocksHistories: stock.stocksHistories,
      symbol: stock.symbol,
      totalItems: stock.stocksHistories.length,
      totalPages: Math.ceil(stock.stocksHistories.length / itemsPerPage),
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// receive a purchase from the endpoint /stocks/purchase
router.post('post-stock-purchase', '/purchase', async (ctx) => {
  const { name, symbol1, quantity1 } = ctx.request.body;
  const request = ctx.orm.request.build({ name, symbol1, });
  try {
    const stock = await ctx.orm.stock.findOne({
      where: { symbol: symbol1 },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }
    // send a message to the channel stocks/request
    const stockRequest = {
      request_id: '',
      group_id: '3',
      symbol: symbol1,
      datetime: new Date(),
      deposit_token: '',
      quantity: quantity1,
      seller: 0,
    };
    mqttClientSender.publish('stocks/request', JSON.stringify(stockRequest));
    ctx.status = 200;
    ctx.body = { message: 'Purchase request sent' };
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// receive validation from the endpoint /stocks/validation

router.get('post-stock-validation', '/validation', async (ctx) => {

});

// Consigue todas las compañias con nombre y symbol //

router.get('get-companies', '/companies', async (ctx) => {
  const companies = await ctx.orm.stock.findAll({
    attributes: ['symbol', 'name'], distinct: true,
  });
  try {
    ctx.body = companies;
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// Consigue todas las stocks de una compañia //

router.get('get-stocks-by-company', '/companies/:symbol', async (ctx) => {

});

module.exports = router;
