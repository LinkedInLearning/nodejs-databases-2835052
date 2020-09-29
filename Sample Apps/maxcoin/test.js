/* eslint-disable no-console */
const axios = require('axios');
const { MongoClient } = require('mongodb');

// Generic function that fetches the closing bitcoin dates of the last month from a public API
async function fetchFromAPI() {
  const response = await axios.get(
    'https://api.coindesk.com/v1/bpi/historical/close.json'
  );
  return response.data;
}

async function connectMongo() {
  const url = 'mongodb://localhost:2717/maxcoin';
  const client = new MongoClient(url, { useUnifiedTopology: true });
  // Use connect method to connect to the Server
  return client.connect();
}

async function run() {
  console.log('Fetching data ...');
  const data = await fetchFromAPI();
  console.log('Successfully fetched data.');

  console.log('Connecting to MongoDB ...');
  const dbClient = await connectMongo();
  console.log(`Successfully connected to MongoDB.`);
}

run().catch(error => console.error(error));