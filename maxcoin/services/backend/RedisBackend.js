/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const Redis = require("ioredis");

const CoinAPI = require('../CoinAPI');

class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
  }

  connect() {
    this.client = new Redis(7379);
    return this.client;
  }

  async disconnect() {
    return this.client.disconnect();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const values = [];
    Object.entries(data.bpi).forEach((entries) => {
      values.push(entries[1]);
      values.push(entries[0]);
    });
    return this.client.zadd('maxcoin:values', values);
  }

  async getMax() {
    return this.client.zrange('maxcoin:values', -1, -1, 'WITHSCORES');
  }

  async max() {
    console.info("Connection to Redis");
    console.time("redis-connect");
    const client = this.connect();
    if (client) {
      console.info("Successfully connected to Redis");
    } else {
      throw new Error("Connecting to Redis failed");
    }
    console.timeEnd("redis-connect");

    console.info("Inserting into Redis");
    console.time("redis-insert");
    const insertResult = await this.insert();
    console.timeEnd("redis-insert");

    console.info(`Inserted ${insertResult} documents into redis`);

    console.info("Querying Redis");
    console.time("redis-find");
    const result = await this.getMax();
    console.timeEnd("redis-find");

    console.info("Disconnecting from Redis");
    console.time("redis-disconnect");
    await this.disconnect();
    console.timeEnd("redis-disconnect");
    return result;
  }
}

module.exports = RedisBackend;