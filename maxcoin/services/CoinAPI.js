const axios = require('axios');

class CoinAPI {
  constructor() {
    this.apiUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json';
  }

  async fetch() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }
}

module.exports = CoinAPI;
