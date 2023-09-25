/* eslint-disable radix */
const KoaRouter = require('koa-router');

const router = new KoaRouter();
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
      },
      where: { symbol },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }
    const total = stock.stocksHistories.length;
    const pageReports = stock.stocksHistories.slice(
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

// receive a purchase from the endpoint /stocks/purchase
router.post('post-stock-purchase', '/purchase', async (ctx) => {
  const { symbol, quantity, groupId } = ctx.request.body;
  try {
    const stock = await ctx.orm.stock.findOne({
      where: { symbol },
    });

    if (!stock) {
      ctx.status = 404;
      ctx.body = { message: 'Stock not found' };
      return;
    }
    // send a message to the channel stocks/request
    const stockRequest = {
      groupId,
      quantity,
      symbol,
    };
    mqttClientSender.publish('stocks/request', JSON.stringify(stockRequest));
    ctx.status = 200;
    ctx.body = { message: 'Purchase request sent' };
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

module.exports = router;
