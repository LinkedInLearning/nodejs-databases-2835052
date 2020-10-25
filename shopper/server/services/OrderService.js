const Models = require("../models/sequelize");

class OrderService {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }
}

module.exports = OrderService;
