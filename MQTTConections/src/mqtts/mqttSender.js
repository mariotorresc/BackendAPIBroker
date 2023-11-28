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
}

function PublishValidation(stockRequest) {
  mqttClientSender.publish('stocks/validation', JSON.stringify(stockRequest), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('validation Published');
    }
  });
}

function PublishNewAuction(auctionData) {
  mqttClientSender.publish('stocks/auctions', JSON.stringify(auctionData), (error) => {
    if (error) {
      console.log(error);
    } else {
      // Si es una de tipo offer     , crear en DB la subasta
      // Si es una de tipo proposal  , crear en DB la propuesta
      // Si es una de tipo acceptance, restar de las acciones disponibles las acciones subastadas y marcar como aceptada la oferta de otro grupo (Eliminar todas las propuestas de otros grupos en esta subasta)
      // Si es una de tipo rejection , marcar propuesta como rechazada
      console.log(`'${auctionData.type}' enviada con éxito:\n${auctionData}`);
    }
  });
}

module.exports = {
  PublishNewRequest,
  PublishValidation,
  PublishNewAuction
};
