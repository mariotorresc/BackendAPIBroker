/* eslint-disable camelcase */
/* eslint-disable radix */
const KoaRouter = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const tx = require('../utils/trx');
const { PublishOffer, PublishProposal } = require('../requests/mqttRequests');
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

    PublishOffer(newAuction);

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

// Propuestas

router.get('get-proposals', '/proposals', async (ctx) => {
  try {
    // TO DO: Varios filtros
    // Obtener offers que sean nuestras, por cada una revisar si tienen alguna proposal
    const { count, rows } = await ctx.orm.Proposal.findAndCountAll();
    ctx.body = {
      proposals: rows,
      totalItems: count,
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('new-proposal', '/proposals/new', async (ctx) => {
  try {
    // Propuestas hechas por admin nuestro
    const { auction_id, stock_id, quantity } = ctx.request.body;

    const newAuction = await ctx.orm.Proposal.create({
      auction_id: auction_id,
      group_id: GROUP_NUMBER,
      proposal_id: uuidv4(),
      quantity: quantity,
      status: 'pending',
      stock_id: stock_id,
    });

    PublishProposal(newAuction);

    ctx.body = {
      offer: newAuction,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('response-to-proposal', '/proposals/response', async (ctx) => {
  try {
    // Propuestas hechas por admin nuestro
    // response es 'acceptance' o 'rejection'
    const { auction_id, proposal_id, response } = ctx.request.body;

    if (response === 'acceptance') {
      // Restar Stocks de la oferta
      // Sumar  Stocks de la propuesta
      // Colocar en proposal_id de Auction el proposal_id de Proposal -> Offer completada
      // Marcar el status de la propuesta a acceptance
    }
    const newAuction = await ctx.orm.Proposal.create({
      auction_id: auction_id,
      group_id: GROUP_NUMBER,
      proposal_id: uuidv4(),
      quantity: quantity,
      status: 'pending',
      stock_id: stock_id,
    });

    PublishProposal(newAuction);

    ctx.body = {
      offer: newAuction,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

router.post('new-proposal-mqtt', '/proposals/new/mqtt', async (ctx) => {
  try {
    // Propuestas hechas por otros grupos
    // Si la offer que recibe esta nueva propuesta es nuestra offer -> Guardarla
    // Si la offer que recibe esta nueva propuesta NO es nuestra offer -> no Guardarla
    const auctionData = ctx.request.body;

    const newAuction = await ctx.orm.Proposal.create({
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: auctionData.proposal_id,
      quantity: auctionData.quantity,
      status: 'pending',
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
