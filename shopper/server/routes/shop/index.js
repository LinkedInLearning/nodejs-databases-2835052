const express = require("express");

const ItemService = require("../../services/ItemService");
const BasketService = require("../../services/BasketService");

module.exports = (config) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const items = await ItemService.getAll();
    return res.render("shop", { items });
  });

  router.get("/tobasket/:itemId", async (req, res) => {
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: "warning",
        text: "Please log in first",
      });
      return res.redirect("/shop");
    }

    try {
      const basket = new BasketService(
        config.redis.client,
        res.locals.currentUser.id
      );
      await basket.add(req.params.itemId);
      req.session.messages.push({
        type: "success",
        text: "The item was added to the basket",
      });
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error adding the item to the basket",
      });
      console.error(err);
    }

    return res.redirect("/shop");
  });

  return router;
};
