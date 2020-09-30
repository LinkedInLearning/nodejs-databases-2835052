/* eslint-disable no-console */

const MongoBackend = require('./services/backend/MongoBackend');

async function run() {
  const mongoBackend = new MongoBackend();
  return mongoBackend.max();
}

run().then().catch(err => console.error(err));