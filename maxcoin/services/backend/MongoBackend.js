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
    const mongoClient = new MongoClient(this.mongoUrl, {});
    try {
      this.client = await mongoClient.connect();
      console.log("Connected to MongoDB server");
      this.collection = this.client.db("maxcoin").collection("values");
      return this.client;
    } catch (err) {
      console.error(`Failed to connect to the mongoDB server ${err}`);
      return -1;
    }
  }

  async disconnect() {
    if (this.client) {
      this.client.close();
    }
  }

  async insert() {
    const data = this.coinAPI.fetch();
    const result = [];
    // Insertion is done in a synchronous way for simplicity purpose
    Object.entries(data.pbi).forEach((entry) => {
      result.push({
        date: entry[0],
        value: entry[1],
      });
    });
  }

  async getMax() {}

  async max() {
    console.info("Connection of mongoDB");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client !== -1) {
      console.info("you can now to send and retreive data from mongoDB");
      this.disconnect();
    }
    console.timeEnd("mongodb-connect");
  }
}

module.exports = MongoBackend;
