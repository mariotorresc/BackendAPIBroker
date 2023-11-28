require("dotenv").config();
const mqtt = require("mqtt");
const { SaveStocks } = require("../queue");
const {
  ValidateRequest,
  SaveExternalRequests,
} = require("../helpers/requests");

const GROUP_NUMBER = 3;

const options = {
  host: process.env.MQTT_HOST,
  password: process.env.MQTT_PASSWORD,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USER,
};

const mqttClient = mqtt.connect(options);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT RECEIVER broker");
  mqttClient.subscribe("stocks/info");
  mqttClient.subscribe("stocks/requests");
  mqttClient.subscribe("stocks/validation");
  mqttClient.subscribe('stocks/auctions');
});

mqttClient.on("message", (topic, message) => {
  if (topic === "stocks/info") {
    const stockInfo = JSON.parse(message.toString());
    // llenar la base de datos
    SaveStocks(stockInfo);
  } else if (topic === "stocks/requests") {
    console.log(`Compra recibida:\n${message}`);
    let requestInfo = null;
    try {
      requestInfo = JSON.parse(message?.toString());
    } catch (e) {
      console.error("Error parsing requestInfo:", e);
    }
    if (requestInfo?.group_id !== GROUP_NUMBER && requestInfo) {
      SaveExternalRequests(requestInfo);
      console.log(
        `External Request (Grupo ${requestInfo?.group_id})\n${message}`
      );
    }
  } else if (topic === "stocks/validation") {
    const validationInfo = JSON.parse(message.toString());
    // actualizar la base de datos
    ValidateRequest(validationInfo);
    console.log(`Compra validada:\n${message}`);
  } else if (topic === 'stocks/auctions') {
    const auctionData = JSON.parse(message.toString());
    // RECIBIR: Subastas y Propuestas de otros grupos
    console.log(`Se recibe una subasta:\n${message}`);
    if (auctionData.type === 'offer') {
      // Subasta
      // TO DO: Guardar subasta en database 
      // Son de otros grupos, admin puede hacerles proposal
    }
    else if (auctionData.type === 'proposal') {
      // Propuesta
      // TO DO: guardar propuesta en database, si se acepta/rechaza/se aceptó otra/aun no se acepta: indicar de alguna forma
    }
    else if (auctionData.type === 'acceptance') {
      // Respuesta a Propuesta
      // Una propuesta fue aceptada
      // Buscar propuesta, marcarla como aceptada
      // Si aceptan una propuesta de nuestro grupo. Eliminar propuesta, sumar acciones a las acciones disponibles para comprar en nuestra app
      // Si es de otro grupo, buscar si nuestro grupo hizo una propuesta. Si esa propuesta existe, marcarla como rechazada
    }
    else if (auctionData.type === 'rejection') {
      // Respuesta a Propuesta
      // Una propuesta fue rechazada
      // Buscar propuesta, marcarla como rechazada
    }
  }
});

mqttClient.on("error", (error) => {
  console.error("Error:", error);
});

mqttClient.on("close", () => {
  console.log("Connection closed");
});
