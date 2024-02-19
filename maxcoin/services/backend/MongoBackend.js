/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const { MongoClient } = require("mongodb");
const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
    this.collection = null;
    this.mongoUrl = "mongodb://localhost:37017/maxcoin";
  }

  async connect() {
    this.client = MongoClient.connect(this.mongoUrl, { useNewUrlParser: true });
    this.collection = (await this.client).db().collection("prices");
  }

  async disconnect() {}

  async insert() {}

  async getMax() {}

  async max() {}
}

module.exports = MongoBackend;
