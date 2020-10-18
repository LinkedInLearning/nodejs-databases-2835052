const express = require("express");

module.exports = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    return res.render("basket", {});

    /*
    // --> Implement adding to basket
    let items = [];
    if (basketItems) {
      items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await ItemService.getOne(key);
        item.quantity = basketItems[key];
        return item;
      }));
    }
    return res.render('basket', { items });
    */
  });

  router.get("/remove/:itemId", async (req, res, next) => {
    return next("Not implemented");

    /*
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please log in first',
      });
      return res.redirect('/shop');
    }

    try {
      // --> Implement removing from basket
      req.session.messages.push({
        type: 'success',
        text: 'The item was removed from the the basket',
      });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error removing the item from the basket',
      });
      console.error(err);
      return res.redirect('/basket');
    }

    return res.redirect('/basket');
    */
  });

  router.get("/buy", async (req, res, next) => {
    return next("Not implemented");

    /*
    try {
      const userId = res.locals.currentUser.id;
      const user = res.locals.currentUser;

      // Get all basket items for a user
      //--> Implement get all from basket

      // be defensive
      if (!basketItems) {
        throw new Error('No items found in basket');
      }

      // Find the item for each basket entry and add the quantity to it
      // Return a new array with items plus quantity as new field
      const items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await ItemService.getOne(key);
        item.quantity = basketItems[key];
        return item;
      }));

      // Run this in a sequelize transaction
      await order.inTransaction(async (t) => {
        // Create a new order and add all items
        await order.create(user, items, t);
        // Clear the users basket
        await Promise.all(Object.keys(basketItems).map(async (key) => {
          // --> Implement removing from basket
        }));
      });

      req.session.messages.push({
        type: 'success',
        text: 'Thank you for your business',
      });

      return res.redirect('/basket');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error finishing your order',
      });
      console.error(err);
      return res.redirect('/basket');
    }
    */
  });

  return router;
};
