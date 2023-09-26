require('dotenv').config();
const mqtt = require('mqtt');

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
};

const mqttClientSender = mqtt.connect(options);

// connect to the channel stocks/request to send a purchase
mqttClientSender.on('connect', () => {
  console.log('Connected to MQTT SENDER broker');
  mqttClientSender.subscribe('stocks/request');
});

mqttClientSender.on('error', (error) => {
  console.error('Error:', error);
});

mqttClientSender.on('close', () => {
  console.log('Connection closed');
});

module.export = mqttClientSender;
