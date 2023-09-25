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
        await existingStock.update({ lastUpdate: new Date(), price: stockData.price }); // Manually update updatedAt
        await stocksHistories.create({
          currency: stockData.currency,
          price: stockData.price,
          source: stockData.source,
          stockId: existingStock.id,
        });
      } else {
        // Create a new stock
        stockData.lastUpdate = new Date();
        const newStock = await stock.create(stockData);
        await stocksHistories.create({
          currency: stockData.currency,
          price: stockData.price,
          source: stockData.source,
          stockId: newStock.id,
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
