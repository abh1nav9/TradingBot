const { getStockPrice } = require('./src/api.js');
const TradingBot = require('./src/trading.js');
const { log } = require('./src/logger.js');

const bot = new TradingBot();
const stockSymbol = 'AAPL'; // Example stock symbol

const monitorStock = async () => {
    const stockPrice = await getStockPrice(stockSymbol);
    if (stockPrice === null) {
        log(`Failed to fetch stock price for ${stockSymbol}.`);
        return; // Exit if price is not available
    }
    log(`Current stock price of ${stockSymbol}: ${stockPrice}`);
    await bot.executeTrade(stockPrice);
};

setInterval(monitorStock, 30000); // Check every minute

process.on('exit', () => {
    const summary = bot.getSummary();
    log('Final Summary:');
    log(`Balance: ${summary.balance}`);
    log(`Profit/Loss: ${summary.profitLoss}`);
    log('Trade History:', summary.tradeHistory);
});
