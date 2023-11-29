/* eslint-disable camelcase */
/* eslint-disable radix */
const KoaRouter = require('koa-router');
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const tx = require('../utils/trx');
const {
  PublishOffer,
  PublishProposal,
  HandleAcceptance,
  HandleRejection
} = require('../requests/mqttRequests');
require('dotenv').config();

const GROUP_NUMBER = 3;
const router = new KoaRouter();

router.get('get-offers', '/offers', async (ctx) => {
  try {
    const { count, rows } = await ctx.orm.Auction.findAndCountAll({
      where: {
        group_id: {
          [Op.ne]: GROUP_NUMBER,
        }
      },
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

    await PublishOffer(newAuction);

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
    const offers = await ctx.orm.Auction.findAll({
      where: { group_id: GROUP_NUMBER, proposal_id: '' },
    });

    const offer_ids = offers.map((offer) => offer.auction_id);
    
    // Obtener offers que sean nuestras, por cada una revisar si tienen alguna proposal
    const { count, rows } = await ctx.orm.Proposal.findAndCountAll({
      where: {
        auction_id: {
          [Op.or]: offer_ids,
        },
        status: 'pending'
      },
    });
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
    // Este endpoint maneja las respuestas de nuestro admin
    // response es 'acceptance' o 'rejection'
    const { auction_id, email, proposal_id, response } = ctx.request.body;

    // FindOne Proposal con proposal_id y Auction con auction_id
    const admin = await ctx.orm.user.findOne({
      where: { email: email },
    });
    const proposal = await ctx.orm.Proposal.findOne({
      where: { proposal_id: proposal_id },
    });
    const offer = await ctx.orm.Auction.findOne({
      where: { auction_id: auction_id },
    });
  
    if (!admin) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    } else if (admin.admin !== true) {
      // TO DO: Al mergear las branch cambiar condition por admin.admin !== true
      ctx.status = 400;
      ctx.body = { message: 'User is not admin' };
      return;
    }
    if (!proposal) {
      ctx.status = 404;
      ctx.body = { message: 'Proposal not found' };
      return;
    } else if (!offer) {
      ctx.status = 404;
      ctx.body = { message: 'Offer not found' };
      return;
    } else if (offer.proposal_id !== '') {
      ctx.status = 400;
      ctx.body = { message: 'Offer is closed' };
      return;
    }


    if (response === 'acceptance') {
      // TO DO
      // Restar Stocks de la oferta
      // Sumar  Stocks de la propuesta
      HandleAcceptance(proposal);
      await proposal.update({
        status: 'acceptance',
      });
      await offer.update({
        proposal_id: proposal.proposal_id,
      });
      // Restar
      const soldStock = await ctx.orm.userStock.findOne({
        where: { stockId: offer.stock_id, userId: admin.id },
      });

      await soldStock.update({
        amount: boughtStock - offer.quantity,
      });

      // Agregar
      const fromCompany = await ctx.orm.company.findOne({
        attributes: ['symbol', 'id'],
        where: { symbol: proposal.stock_id },
      });

      const boughtStock = await ctx.orm.userStock.findOne({
        where: { stockId: proposal.stock_id, userId: admin.id },
      });
      if (!boughtStock) {
        await ctx.orm.userStock.create({
          amount: proposal.quantity,
          stockId: proposal.stock_id,
          userId: admin.id,
          companyId: fromCompany.id
        });
      } else {
        await boughtStock.update({
          amount: boughtStock + proposal.quantity
        });
      }
      
    } else if (response === 'rejection') {
      // Marcar el status de la propuesta a rejection
      HandleRejection(proposal);
      await proposal.update({
        status: 'rejection',
      });
    } else {
      ctx.status = 400;
      ctx.body = { message: 'input error' };
      return;
    }
    const newAuction = await ctx.orm.Proposal.create({
      auction_id: auction_id,
      group_id: GROUP_NUMBER,
      proposal_id: uuidv4(),
      quantity: quantity,
      status: 'pending',
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

router.post('new-proposal-mqtt', '/proposals/new/mqtt', async (ctx) => {
  try {
    // Propuestas hechas por otros grupos
    const auctionData = ctx.request.body;

    const offer = await ctx.orm.Auction.findOne({
      where: { auction_id: auctionData.auction_id },
    });
    if (!offer) {
      ctx.status = 200;
      ctx.body = { message: 'Offer not found' };
      return;
    } else if (offer.group_id !== GROUP_NUMBER) {
      ctx.status = 200;
      ctx.body = { message: 'Offer not owned by this group' };
      return;
    } else if (offer.proposal_id !== '') {
      ctx.status = 200;
      ctx.body = { message: 'Offer is closed' };
      return;
    }

    const newProposal = await ctx.orm.Proposal.create({
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: auctionData.proposal_id,
      quantity: auctionData.quantity,
      status: 'pending',
      stock_id: auctionData.stock_id,
    });

    ctx.body = {
      offer: newProposal,
    };
    ctx.status = 201;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

module.exports = router;
