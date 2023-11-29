const axios = require('axios');

async function PublishNewRequest(stockRequest) {
  await axios
    .post('http://mqttsender:3010/sender/newRequest', stockRequest)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function PublishValidation(validationBody) {
  await axios
    .post('http://mqttsender:3010/sender/validation', validationBody)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function PublishOffer(auctionData) {
  const config = {
    data: auctionData,
    method: 'post',
    url: 'http://mqttsender:3010/sender/offer',
  };
  await axios(config)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function PublishProposal(auctionData) {
  await axios
    .post('http://mqttsender:3010/sender/proposal', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function HandleAcceptance(auctionData) {
  await axios
    .post('http://mqttsender:3010/sender/acceptance', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

async function HandleRejection(auctionData) {
  await axios
    .post('http://mqttsender:3010/sender/rejection', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

module.exports = {
  HandleAcceptance,
  HandleRejection,
  PublishNewRequest,
  PublishOffer,
  PublishProposal,
  PublishValidation
};
