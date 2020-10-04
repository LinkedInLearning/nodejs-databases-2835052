const CoinAPI = require("./services/CoinAPI");

async function run() {
  const coinAPI = new CoinAPI();
  return coinAPI.fetch();
}

run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
