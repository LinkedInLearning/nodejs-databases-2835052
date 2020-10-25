const Models = require("../models/sequelize");

class OrderService {
  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async inTransaction(work) {
    const t = await this.client.transaction();
    try {
      await work(t);
      return t.commit();
    } catch (error) {
      t.rollback();
      throw error;
    }
  }

  async create(user, items, t) {
    const order = await this.models.Order.create(
      {
        userId: user.id,
        email: user.email,
        status: "Not Shipped",
      },
      { transaction: t }
    );

    return Promise.all(
      items.map(async (item) => {
        const orderItem = await this.models.OrderItem.create({
          sku: item.sku,
          qty: item.qty,
          price: item.price,
          name: item.name,
        });
        return order.addOrderItem(orderItem, { transaction: t });
      })
    );
  }

  async getAll() {
    return this.models.Order.findAll({
      where: {},
      include: [this.models.OrderItem],
    });
  }

  async setStatus(orderId, status) {
    return this.models.Order.update({ status }, { where: { id: orderId } });
  }
}

module.exports = OrderService;
