/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
    this.collection = null;
    this.mongoUrl = "mongodb://localhost:37017/maxcoin";
  }

  async connect() {}

  async disconnect() {}

  async insert() {}

  async getMax() {}

  async max() {}
}

module.exports = MongoBackend;
