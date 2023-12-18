/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

// const CoinAPI = require('../CoinAPI');
const { MongoClient } = require('mongodb')

class MongoBackend {
  constructor() {
    // this.coinAPI = new CoinAPI();
    this.mongoUrl = 'mongodb://localhost:37017/maxcooin'
    this.client = null
    this.collection = null
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, {
      useUnifiedTopology: true, // useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
      useNewUrlParser: true, // useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
    })

    this.client = await mongoClient.connect()

    this.collection = this.client.db('maxcoin').collection('values')

    return this.client
  }

  async disconnect() {
    if (this.client) return this.client.close()

    return false
  }

  async insert() {}

  async getMax() {}

  async max() {
    console.info('### Connection to MongoDB')
    console.time('--- mongodb-connect')
    const client = await this.connect()
    if (client.isConnected()) {
      console.info('Successfully connected to MongoDB')
    } else {
      throw new Error('Connection to MongoDB failed!')
    }
    console.timeEnd('--- mongodb-connect')

    console.info('### Disconnection from MongoDB')
    console.time('--- mongodb-disconnect')
    await this.disconnect()
    console.timeEnd('--- mongodb-disconnect')
  }
}

module.exports = MongoBackend
