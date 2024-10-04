// Write write you all trade logs in a log file
const fs = require('fs');

const log = (message) => {
    console.log(message);
    fs.appendFile('trading.log', `${new Date().toISOString()}: ${message}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
};

module.exports = { log };
