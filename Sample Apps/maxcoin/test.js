/* eslint-disable no-console */

const MongoBackend = require('./services/backend/MongoBackend');

async function run() {
  const mongoBackend = new MongoBackend();
  const mongoMax = await mongoBackend.max();
  console.log(`MongoDB: The one month max value is ${mongoMax.value} and was reached on ${mongoMax.date}`);
}

run().then().catch(err => console.error(err));