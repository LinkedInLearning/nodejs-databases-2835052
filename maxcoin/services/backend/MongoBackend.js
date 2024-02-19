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
    this.client = new MongoClient(this.mongoUrl, { useUnifiedTopology: true });
    try {
      await this.client.connect();
      console.log("Connected to MongoDB server");
      this.collection = this.client.db("maxcoin").collection("values");
    } catch (err) {
      console.error(`Failed to connect to the mongoDB server ${err}`);
    }
  }

  async disconnect() {}

  async insert() {}

  async getMax() {}

  async max() {}
}

module.exports = MongoBackend;
