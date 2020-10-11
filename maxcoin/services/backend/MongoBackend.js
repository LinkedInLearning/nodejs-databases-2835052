/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const { MongoClient } = require("mongodb");

const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
  }

  async connect() {}

  async disconnect() {}

  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];
    Object.entries(data.bpi).forEach((entry) => {
      documents.push({
        date: entry[0],
        value: entry[1],
      });
    });
    return this.collection.insertMany(documents);
  }

  async getMax() {}

  async max() {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client.isConnected()) {
      console.info("Successfully connected to MongoDB");
    } else {
      throw new Error("Connecting to MongoDB failed");
    }
    console.timeEnd("mongodb-connect");

    console.info("Inserting into MongoDB");
    console.time("mongodb-insert");
    const insertResult = await this.insert();
    console.timeEnd("mongodb-insert");

    console.info(`Inserted ${insertResult.result.n} documents into MongoDB`);

    console.info("Disconnecting from MongoDB");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");
  }
}

module.exports = MongoBackend;
