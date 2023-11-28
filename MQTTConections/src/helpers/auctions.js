const { auction } = require("../models");

async function SaveAuction(auctionData) {
  try {
    const newAuction = {
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: '',
      quantity: auctionData.quantity,
      stock_id: auctionData.stock_id,
    };
    // TO DO: enviar por axios
  } catch (error) {
    console.log(error);
  }
};

async function SaveProposal(auctionData) {
  try {
    const newAuction = await auction.create({
      auction_id: auctionData.auction_id,
      group_id: auctionData.group_id,
      proposal_id: auctionData.proposal_id,
      quantity: auctionData.quantity,
      status: 'pending',
      stock_id: auctionData.stock_id,
    });
  } catch (error) {
    console.log(error);
  }
};

async function HandleAcceptance(auctionData) {
  try {

  } catch (error) {
    console.log(error);
  }
};

async function HandleRejection(auctionData) {
  try {

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