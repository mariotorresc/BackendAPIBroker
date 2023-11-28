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
  const data = auctionData;
  data.type = 'offer';
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito:\n${auctionData}`);
    }
  });
};

function PublishNewProposal(auctionData) {
  const data = auctionData;
  data.type = 'proposal';
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito:\n${auctionData}`);
    }
  });
};

function PublishAcceptance(auctionData) {
  const data = auctionData;
  data.type = 'acceptance';
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito:\n${auctionData}`);
    }
  });
};

function PublishRejection(auctionData) {
  const data = auctionData;
  data.type = 'rejection';
  mqttClientSender.publish('stocks/auctions', JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`'${data.type}' enviada con éxito:\n${auctionData}`);
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
