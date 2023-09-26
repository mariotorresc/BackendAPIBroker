/* eslint-disable camelcase */
require('dotenv').config();
const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');
const { SaveRequests } = require('./src/helpers/requests');

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
});

mqttClientSender.on('error', (error) => {
  console.error('Error:', error);
});

mqttClientSender.on('close', () => {
  console.log('Connection closed');
});

function PublishNewRequest(requestInfo) {
  const stockRequest = {
    datetime: new Date(),
    deposit_token: '',
    group_id: requestInfo.groupId,
    quantity: requestInfo.quantity,
    request_id: uuidv4(),
    seller: 0,
    symbol: requestInfo.symbol,
  };
  mqttClientSender.publish('stocks/requests', JSON.stringify(stockRequest), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Published');
      SaveRequests(stockRequest);
    }
  });
}

module.exports = {
  PublishNewRequest,
};
