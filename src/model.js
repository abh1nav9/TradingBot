// Can be expanded if you need complex models later
class Trade {
    constructor(type, price, shares) {
        this.type = type;
        this.price = price;
        this.shares = shares;
        this.timestamp = new Date();
    }
}

module.exports = Trade;
