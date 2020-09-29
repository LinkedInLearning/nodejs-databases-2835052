/* eslint-disable no-console */
const CoinAPI = require('./services/CoinAPI');
const coinAPI = new CoinAPI();

async function run() {
  const data = await coinAPI.fetch();
  console.log(data);
  return data;
}

run().catch(error => console.error(error));