const axios = require('axios');

async function PublishNewRequest(stockRequest) {
  await axios
    .post('http://mqttsender:3010/sender/newRequest', stockRequest)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

async function PublishValidation(validationBody) {
  await axios
    .post('http:/mqttsender:3010/sender/validation', validationBody)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

async function PublishOffer(auctionData) {
  await axios
    .post('http:/mqttsender:3010/sender/offer', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

async function PublishProposal(auctionData) {
  await axios
    .post('http:/mqttsender:3010/sender/proposal', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

async function HandleAcceptance(auctionData) {
  await axios
    .post('http:/mqttsender:3010/sender/acceptance', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

async function HandleRejection(auctionData) {
  await axios
    .post('http:/mqttsender:3010/sender/rejection', auctionData)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

module.exports = {
  PublishNewRequest,
  PublishValidation,
  PublishOffer,
  PublishProposal,
  HandleAcceptance,
  HandleRejection
};
