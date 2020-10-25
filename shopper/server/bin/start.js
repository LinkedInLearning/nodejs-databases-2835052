#!/usr/bin/env node

const http = require("http");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const Sequelize = require("sequelize");

const config = require("../config");
const App = require("../app");

async function connectToMongoose() {
  return mongoose.connect(config.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

function connectToRedis() {
  const redis = new Redis(config.redis.port);
  redis.on("connect", () => {
    console.info("Successfully connected to Redis");
  });

  redis.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
  return redis;
}

function connectToMySQL() {
  const sequelize = new Sequelize(config.mysql.options);
  sequelize
    .authenticate()
    .then(() => {
      console.info("Successfully connected to MySQL");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  return sequelize;
}

const redis = connectToRedis();
config.redis.client = redis;

const mysql = connectToMySQL();
config.mysql.client = mysql;

/* Logic to start the application */
const app = App(config);
const port = process.env.PORT || "3000";
app.set("port", port);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port  ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  console.info(`${config.applicationName} listening on ${bind}`);
}
server.on("error", onError);
server.on("listening", onListening);

connectToMongoose()
  .then(() => {
    console.info("Successfully connected to MongoDB");
    server.listen(port);
  })
  .catch((error) => {
    console.error(error);
  });
