const MongoBackend = require("./services/backend/MongoBackend");

async function run() {
  const mongoBackend = new MongoBackend();
  return mongoBackend.max();
}

run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
