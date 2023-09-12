/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-console */
const { stock, stocksHistories } = require('../models');

async function SaveStocks(stockInfo) {
  const stocksArray = JSON.parse(stockInfo.stocks);

  for (const stockData of stocksArray) {
    try {
      const existingStock = await stock.findOne({ where: { symbol: stockData.symbol } });
      if (existingStock) {
        await existingStock.update({ price: stockData.price, lastUpdate: new Date() }); // Manually update updatedAt
        await stocksHistories.create({
          stockId: existingStock.id,
          source: stockData.source,
          currency: stockData.currency,
          price: stockData.price,
        });
      } else {
        // Create a new stock
        stockData.lastUpdate = new Date();
        const newStock = await stock.create(stockData);
        await stocksHistories.create({
          stockId: newStock.id,
          source: stockData.source,
          currency: stockData.currency,
          price: stockData.price,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log('Stocks passed to DB!');
}

module.exports = {
  SaveStocks,
};
