/* eslint-disable camelcase */
/* eslint-disable radix */
const KoaRouter = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const tx = require('../utils/trx');
require('dotenv').config();

const GROUP_NUMBER = 3;
const router = new KoaRouter();

router.get('get-offers', '/offers', async (ctx) => {
  try {
    const { count, rows } = await ctx.orm.Auction.findAndCountAll({
      where: { group_id: GROUP_NUMBER },
    });
    ctx.body = {
      offers: rows,
      totalItems: count,
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('new-offer', '/offers/new', async (ctx) => {
  try {
    // Subastas hechas por admin nuestro
    const { stock_id, quantity } = ctx.request.body;

    const newAuction = await ctx.orm.Auction.create({
      auction_id: uuidv4(),
      group_id: GROUP_NUMBER,
      proposal_id: '',
      quantity: quantity,
      stock_id: stock_id,
    });

    ctx.body = {
      offer: newAuction,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('new-offer-mqtt', '/offers/new/mqtt', async (ctx) => {
  try {
    // Subastas hechas por otros grupos
    const auctionData = ctx.request.body;

    const newAuction = await ctx.orm.Auction.create({
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: '',
      quantity: auctionData.quantity,
      stock_id: auctionData.stock_id,
    });

    ctx.body = {
      offer: newAuction,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});


module.exports = router;
