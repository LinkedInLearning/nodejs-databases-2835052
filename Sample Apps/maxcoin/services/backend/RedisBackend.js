/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const CoinAPI = require('../CoinAPI');

class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
  }

  async connect() {

  }

  async insert() {

  }

  async max() {

  }
}

module.exports = RedisBackend;