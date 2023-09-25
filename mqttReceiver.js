require('dotenv').config();
const mqtt = require('mqtt');
const { SaveStocks } = require('./src/queue');
const { ValidateRequest } = require('./src/helpers/requests');

const options = {
  host: process.env.MQTT_HOST,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
};

const mqttClient = mqtt.connect(options);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT RECEIVER broker');
  mqttClient.subscribe('stocks/info');
  mqttClient.subscribe('stocks/validation');
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'stocks/info') {
    const stockInfo = JSON.parse(message.toString());
    // llenar la base de datos
    SaveStocks(stockInfo);
  }
  else if (topic === 'stocks/validation') {
    const validationInfo = JSON.parse(message.toString());
    // actualizar la base de datos
    if (validationInfo.group_id === 3) {
      ValidateRequest(validationInfo);
    }
  }
});

mqttClient.on('error', (error) => {
  console.error('Error:', error);
});

mqttClient.on('close', () => {
  console.log('Connection closed');
});
