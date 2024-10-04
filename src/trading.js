class TradingBot {
    constructor() {
        this.balance = 10000;  // Starting balance
        this.position = null;   // Current stock position
        this.tradeHistory = [];  // Array to track trades
    }

    async executeTrade(stockPrice) {
        if (this.position) {
            // Sell logic: sell if the stock price rises by 3%
            if (stockPrice >= this.position * 1.03) {
                this.sell(stockPrice);
            }
        } else {
            // Buy logic: buy if the stock price drops by 2%
            if (stockPrice <= this.balance * 0.98) {
                this.buy(stockPrice);
            }
        }
    }

    buy(price) {
        const shares = Math.floor(this.balance / price);
        if (shares > 0) {
            this.position = price; // Set the price at which the stock was bought
            this.balance -= shares * price;
            this.tradeHistory.push({ type: 'buy', price, shares });
            console.log(`Bought ${shares} shares at ${price}`);
        }
    }

    sell(price) {
        if (this.position) {
            const profit = price - this.position;
            this.balance += profit * (this.tradeHistory[0].shares); // Assuming single buy
            this.tradeHistory.push({ type: 'sell', price, shares: this.tradeHistory[0].shares });
            this.position = null; // Clear position after selling
            console.log(`Sold shares at ${price}. Profit: ${profit}`);
        }
    }

    getSummary() {
        const totalProfitLoss = this.balance + (this.position ? this.position * this.tradeHistory[0].shares : 0) - 10000; // Initial balance
        return {
            balance: this.balance,
            profitLoss: totalProfitLoss,
            tradeHistory: this.tradeHistory
        };
    }
}

module.exports = TradingBot;