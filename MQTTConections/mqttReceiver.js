require('dotenv').config();
const mqtt = require('mqtt');
const { SaveStocks } = require('../src/queue');

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = mqtt.connect(options);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT RECEIVER broker');
  mqttClient.subscribe('stocks/info');
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'stocks/info') {
    const stockInfo = JSON.parse(message.toString());
    // llenar la base de datos
    SaveStocks(stockInfo);
  }
});

mqttClient.on('error', (error) => {
  console.error('Error:', error);
});

mqttClient.on('close', () => {
  console.log('Connection closed');
});
