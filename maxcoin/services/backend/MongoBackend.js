/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const { MongoClient } = require("mongodb");
const CoinAPI = require("../CoinAPI");

class MongoBackend {
  constructor() {
    this.coinAPI = new CoinAPI();
    this.client = null;
    this.collection = null;
    this.mongoUrl = "mongodb://localhost:37017/maxcoin";
  }

  async connect() {
    const mongoClient = new MongoClient(this.mongoUrl, {});
    try {
      this.client = await mongoClient.connect();
      console.log("Connected to MongoDB server");
      this.collection = this.client.db("maxcoin").collection("values");
      return this.client;
    } catch (err) {
      console.error(`Failed to connect to the mongoDB server ${err}`);
      return -1;
    }
  }

  async disconnect() {
    if (this.client) {
      this.client.close();
    }
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];
    // Insertion is done in a synchronous way for simplicity purpose
    Object.entries(data.bpi).forEach((entry) => {
      documents.push({
        date: entry[0],
        value: entry[1],
      });
    });
    return this.collection.insertMany(
      documents.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date);
      })
    );
  }

  async getMax() {
    return this.collection.findOne({}, { value: { sort: -1 } });
  }

  async max() {
    console.info("Connection of mongoDB");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client !== -1) {
      console.info("you can now to send and retreive data from mongoDB");
    } else {
      throw new Error("Connecting to MongoDB failed");
    }
    console.timeEnd("mongodb-connect");

    /*  console.info("Inserting into MongoDB");
    console.time("mongodb-insert");
    const insertResult = await this.insert();
    console.timeEnd("mongodb-insert");
    console.info(`Inserted ${insertResult.insertedCount} document(s)`);
 */
    console.info("find Max value into MongoDB");
    console.time("mongodb-find");
    const doc = this.getMax();
    console.timeEnd("mongodb-find");

    console.info("Disconnecting into MongoDB");
    console.time("mongodb-disconnect");
    this.disconnect();
    console.timeEnd("mongodb-disconnect");
    return {
      date: doc.date,
      value: doc.value,
    };
  }
}

module.exports = MongoBackend;
