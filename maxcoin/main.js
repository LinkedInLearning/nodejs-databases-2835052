// const CoinAPI = require("./services/CoinAPI");
const MongoBackend=require('./services/backend/MongoBackend')

async function run() {
  // const coinAPI = new CoinAPI();
  // return coinAPI.fetch();
const mongoBackend=new MongoBackend()
return mongoBackend.max()
}

run()
  .then((result) => {
    console.log('result:',result);
  })
  .catch((err) => console.error(err));
