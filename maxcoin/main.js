const CoinAPI = require("./services/CoinAPI");

async function run() {
  const mongoBackend = new MongoBackend();
  return mongoBackend.max();
}

run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
