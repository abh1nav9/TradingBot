const axios = require('axios');
require('dotenv').config();

const ALPACA_API_URL = 'https://data.alpaca.markets/v2';
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.SECRET_KEY;

const getStockPrice = async (symbol) => {
    try {
        const response = await axios.get(`${ALPACA_API_URL}/stocks/${symbol}/quotes/latest`, {
            headers: {
                'APCA-API-KEY-ID': API_KEY,
                'APCA-API-SECRET-KEY': API_SECRET,
            },
        });
        
        // Access the ask price (ap) or bid price (bp) as per your requirement
        const currentPrice = response.data.quote.ap; // Use 'ap' for ask price
        console.log(response.data); // Log the response for debugging
        return currentPrice; // Return the current price
    } catch (error) {
        if (error.response) {
            console.error('Error fetching stock price:', error.response.status, error.response.data);
        } else {
            console.error('Error fetching stock price:', error.message);
        }
        return null; // Return null in case of an error
    }
};

module.exports = { getStockPrice };
