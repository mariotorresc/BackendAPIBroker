const axios = require('axios');
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