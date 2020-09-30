/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');
const { MongoClient } = require('mongodb');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
    this.mongoUrl = 'mongodb://localhost:27017/maxcoin';
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client = await mongoClient.connect();
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return false;
  }

  async disconnect() {

  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];
    const db = this.client.db('maxcoin');
    const collection = db.collection('values');
    for (const [key, value] of Object.entries(data.bpi)) {
      documents.push({
        date: key,
        value,
      });
    }
    return collection.insertMany(documents);
  }

  async getMax() {

  }

  async max() {
    console.log('Connecting to MongoDB');
    console.time('mongodb-connect');
    await this.connect();
    console.timeEnd('mongodb-connect');
    console.log('Successfully connected to MongoDB');

    console.time('mongodb-insert');
    await this.insert();
    console.timeEnd('mongodb-insert');

    console.time('mongodb-disconnect');
    await this.disconnect();
    console.timeEnd('mongodb-disconnect');
  }
}

module.exports = MongoBackend;