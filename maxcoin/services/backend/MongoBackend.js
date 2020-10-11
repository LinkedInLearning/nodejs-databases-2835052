/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
  }

  async connect() {}

  async disconnect() {}

  async insert() {}

  async getMax() {}

  async max() {}
}

module.exports = MongoBackend;