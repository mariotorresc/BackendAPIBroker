require('dotenv').config();
const mqtt = require('mqtt');
const { SaveStocks } = require('./src/queue');
const { ValidateRequest, SaveExternalRequests } = require('./src/helpers/requests');

const GROUP_NUMBER = 3;

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
  mqttClient.subscribe('stocks/requests');
  mqttClient.subscribe('stocks/validation');
  mqttClient.subscribe('stocks/auctions');
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'stocks/info') {
    const stockInfo = JSON.parse(message.toString());
    // llenar la base de datos
    SaveStocks(stockInfo);
  }
  else if (topic === 'stocks/requests') {
    const requestInfo = JSON.parse(message.toString());
    if (requestInfo.group_id !== GROUP_NUMBER) {
      SaveExternalRequests(requestInfo);
      console.log(`External Request (Grupo ${requestInfo.group_id})\n${message}`);
    }
  }
  else if (topic === 'stocks/validation') {
    const validationInfo = JSON.parse(message.toString());
    // actualizar la base de datos
    ValidateRequest(validationInfo);
    console.log(`Compra válida:\n${message}`);
  }
  else if (topic === 'stocks/auctions') {
    const auctionData = JSON.parse(message.toString());
    // RECIBIR: Subastas y Propuestas de otros grupos
    console.log(`Se recibe una subasta:\n${message}`);
    if (auctionData.type === 'offer') {
      // Subasta
      // TO DO: Guardar subasta en database 
    }
    else if (auctionData.type === 'proposal') {
      // Propuesta
      // TO DO: guardar oferta en database, si se acepta/rechaza/se aceptó otra/aun no se acepta: indicar de alguna forma
    }
    else if (auctionData.type === 'acceptance') {
      // Respuesta a Propuesta
      // Una propuesta fue aceptada
      // Buscar propuesta, marcarla como aceptada
    }
    else if (auctionData.type === 'rejection') {
      // Respuesta a Propuesta
      // Una propuesta fue rechazada
      // Buscar propuesta, marcarla como rechazada
    }
  }
});

mqttClient.on('error', (error) => {
  console.error('Error:', error);
});

mqttClient.on('close', () => {
  console.log('Connection closed');
});
