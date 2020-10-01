// from https://github.com/sequelize/express-example/blob/master/models/index.js

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const db = {};
  fs
    .readdirSync(__dirname)
    .filter(file =>
      (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  // Is asynchronous but we won't wait here
  sequelize.sync();

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
