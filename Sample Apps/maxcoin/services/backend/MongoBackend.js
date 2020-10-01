/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');
const { MongoClient } = require('mongodb');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = 'mongodb://localhost:27017/maxcoin';
    this.client = null;
    this.collection = null;
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client = await mongoClient.connect();
    this.collection = this.client.db('maxcoin').collection('values');
    return this.client;
  }

  async disconnect() {
    if (this.client) {
      return this.client.close();
    }
    return false;
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];

    for (const [key, value] of Object.entries(data.bpi)) {
      documents.push({
        date: key,
        value,
      });
    }
    await this.collection.insertMany(documents);
    console.log(`Successfully inserted ${documents.length} documents into MongoDB`);
  }

  async getMax() {
    // We will simply sort by value and select the first entry from the database
    // This will naturally be the highest value
    const options = { "sort": [['value', 'desc']] };
    return this.collection.findOne({}, options);
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

    console.time('mongodb-find');
    const doc = await this.getMax();
    console.timeEnd('mongodb-find');

    console.time('mongodb-disconnect');
    await this.disconnect();
    console.timeEnd('mongodb-disconnect');

    return {
      date: doc.date,
      value: doc.value,
    }
  }
}

module.exports = MongoBackend;