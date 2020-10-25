class BasketService {
  constructor(client, userId) {
    this.client = client;
    this.key = `basket:${userId}`;
  }

  async add(itemId) {
    return this.client.hincrby(this.key, itemId, 1);
  }

  async getAll() {
    return this.client.hgetall(this.key);
  }

  async remove(itemId) {
    return this.client.hdel(this.key, itemId);
  }
}

module.exports = BasketService;
