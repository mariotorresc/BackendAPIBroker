const axios = require('axios');
const { Auction, company, Proposal, userStock,  } = require("../models");

async function SaveAuction(auctionData) {
  try {
    const newAuction = {
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: '',
      quantity: auctionData.quantity,
      stock_id: auctionData.stock_id,
    };
    const config = {
      method: 'post',
      url: `http://app:3000/auctions/offers/new/mqtt`,
      data: newAuction,
    };
    await axios(config);

  } catch (error) {
    console.log(error);
  }
};

async function SaveProposal(auctionData) {
  try {
    // validate input?
    const newAuction = {
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: auctionData.proposal_id,
      quantity: auctionData.quantity,
      stock_id: auctionData.stock_id,
    };
    const config = {
      method: 'post',
      url: `http://app:3000/auctions/proposals/new/mqtt`,
      data: newAuction,
    };
    await axios(config);
  } catch (error) {
    console.log(error);
  }
};

async function HandleAcceptance(auctionData) {
  try {
    const proposal = await Proposal.findOne({
      where: { proposal_id: auctionData.proposal_id },
    });
    const offer = await Auction.findOne({
      where: { auction_id: auctionData.auction_id },
    });

    if (!offer) {
      return;
    } else if (!proposal) {
      await offer.update({
        proposal_id: auctionData.proposal_id
      });
    } else if (proposal.group_id !== 3) {
      // La propuesta aceptada no es de nuestro grupo
      await offer.update({
        proposal_id: auctionData.proposal_id
      });
      await proposal.update({
        status: 'acceptance',
      });
      const defaulfRejected = await Proposal.findOne({
        where: { auction_id: auctionData.auction_id, group_id: 3 },
      });
      if (defaulfRejected) {
        await defaulfRejected.update({
          status: 'rejection',
        });
      }
    } else {
      // Aceptada es nuestra
      await proposal.update({
        status: 'acceptance',
      });

      // Restar
      const soldStock = await userStock.findOne({
        where: { stockId: proposal.stock_id },
      });

      await soldStock.update({
        amount: boughtStock - proposal.quantity,
      });

      // Agregar
      const fromCompany = await company.findOne({
        attributes: ['symbol', 'id'],
        where: { symbol: offer.stock_id },
      });

      const boughtStock = await userStock.findOne({
        where: { stockId: offer.stock_id },
      });
      if (!boughtStock) {
        //buscar admin
        const admin = await soldStock.getUser();
        await userStock.create({
          amount: offer.quantity,
          stockId: offer.stock_id,
          userId: admin.id,
          companyId: fromCompany.id
        });
      } else {
        await boughtStock.update({
          amount: boughtStock + offer.quantity
        });
      }
    }
    
  } catch (error) {
    console.log(error);
  }
};

async function HandleRejection(auctionData) {
  try {
    const proposal = await Proposal.findOne({
      where: { proposal_id: auctionData.proposal_id },
    });

    if (!proposal) {
      
    } else {
      await proposal.update({
        status: 'rejection',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  SaveAuction,
  SaveProposal,
  HandleAcceptance,
  HandleRejection
}