/* eslint-disable camelcase */
require('dotenv').config();
const mqtt = require('mqtt');

const options = {
  host: process.env.MQTT_HOST,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
};

const mqttClientSender = mqtt.connect(options);

// connect to the channel stocks/requests to send a purchase
mqttClientSender.on('connect', () => {
  console.log('Connected to MQTT SENDER broker');
  mqttClientSender.subscribe('stocks/requests');
  mqttClientSender.subscribe('stocks/validation');
  mqttClientSender.subscribe('stocks/auctions');
});

mqttClientSender.on('error', (error) => {
  console.error('Error:', error);
});

mqttClientSender.on('close', () => {
  console.log('Connection closed');
});

function PublishNewRequest(stockRequest) {
  mqttClientSender.publish('stocks/requests', JSON.stringify(stockRequest), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Published');
    }
  });
};

function PublishValidation(stockRequest) {
  mqttClientSender.publish('stocks/validation', JSON.stringify(stockRequest), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('validation Published');
    }
  });
};

function PublishNewOffer(auctionData) {
  console.log('----- Oferta para enviar -----')
  console.log(auctionData);
  const data = {
    auction_id: auctionData.auction_id,
    group_id: auctionData.group_id,
    proposal_id: '',
    quantity: auctionData.quantity,
    stock_id: auctionData.stock_id,
    type: 'offer'
  };
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito`);
    }
  });
};

function PublishNewProposal(auctionData) {
  console.log('----- Propuesta para enviar -----')
  console.log(auctionData);
  const data = {
    auction_id: auctionData.auction_id,
    group_id: auctionData.group_id,
    proposal_id: auctionData.proposal_id,
    quantity: auctionData.quantity,
    stock_id: auctionData.stock_id,
    type: 'proposal'
  };
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito`);
    }
  });
};

function PublishAcceptance(auctionData) {
  console.log('----- Propuesta aceptada -----')
  console.log(auctionData);
  const data = {
    auction_id: auctionData.auction_id,
    group_id: auctionData.group_id,
    proposal_id: auctionData.proposal_id,
    quantity: auctionData.quantity,
    stock_id: auctionData.stock_id,
    type: 'acceptance'
  };
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito`);
    }
  });
};

function PublishRejection(auctionData) {
  console.log('----- Propuesta rechazada -----')
  console.log(auctionData);
  const data = {
    auction_id: auctionData.auction_id,
    group_id: auctionData.group_id,
    proposal_id: auctionData.proposal_id,
    quantity: auctionData.quantity,
    stock_id: auctionData.stock_id,
    type: 'rejection'
  };
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito`);
    }
  });
};

module.exports = {
  PublishNewRequest,
  PublishValidation,
  PublishNewOffer,
  PublishNewProposal,
  PublishAcceptance,
  PublishRejection
};
