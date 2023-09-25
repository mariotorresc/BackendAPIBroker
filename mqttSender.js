require('dotenv').config();
const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');
const { SaveRequests } = require('./src/helpers/requests');

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
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
    request_id: uuidv4(),
    group_id: requestInfo.groupId,
    symbol: requestInfo.symbol,
    datetime: new Date(),
    deposit_token: '',
    quantity: requestInfo.quantity,
    seller: 0,
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