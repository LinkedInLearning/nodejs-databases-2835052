const express = require("express");

module.exports = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    return res.render("basket", {});

    /*
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: "warning",
        text: "Please log in first",
      });
      return res.redirect("/shop");
    }
    const basket = new BasketService(
      config.redis.client,
      res.locals.currentUser.id
    );
    const basketItems = await basket.getAll();
    let items = [];
    if (basketItems) {
      items = await Promise.all(
        Object.keys(basketItems).map(async (itemId) => {
          const item = await ItemService.getOne(itemId);
          item.quantity = basketItems[itemId];
          return item;
        })
      );
    }
    return res.render("basket", { items });
    */
  });

  router.get("/remove/:itemId", async (req, res, next) => {
    return next("Not implemented");

    /*
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
      await basket.remove(req.params.itemId);
      req.session.messages.push({
        type: "success",
        text: "The item was removed from the the basket",
      });
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error removing the item from the basket",
      });
      console.error(err);
      return res.redirect("/basket");
    }

    return res.redirect("/basket");
    */
  });

  router.get("/buy", async (req, res, next) => {
    return next("Not implemented");
    /*
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: "warning",
        text: "Please log in first",
      });
      return res.redirect("/shop");
    }
    try {
      const userId = res.locals.currentUser.id;
      const user = res.locals.currentUser;

      // Get all basket items for a user
      const basket = new BasketService(config.redis.client, userId);
      const basketItems = await basket.getAll();

      // be defensive
      if (!basketItems) {
        throw new Error("No items found in basket");
      }

      // Find the item for each basket entry and add the quantity to it
      // Return a new array with items plus quantity as new field
      const items = await Promise.all(
        Object.keys(basketItems).map(async (key) => {
          const item = await ItemService.getOne(key);
          return {
            sku: item.sku,
            qty: basketItems[key],
            price: item.price,
            name: item.name,
          };
        })
      );

      // Run this in a sequelize transaction
      await order.inTransaction(async (t) => {
        // Create a new order and add all items
        await order.create(user, items, t);
        // Clear the users basket
        await Promise.all(
          Object.keys(basketItems).map(async (itemId) => {
            await basket.remove(itemId);
          })
        );
      });

      req.session.messages.push({
        type: "success",
        text: "Thank you for your business",
      });

      return res.redirect("/basket");
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error finishing your order",
      });
      console.error(err);
      return res.redirect("/basket");
    }
    */
  });

  return router;
};
