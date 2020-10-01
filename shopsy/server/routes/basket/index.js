const express = require('express');

module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;

  router.get('/', async (req, res) => {
    return res.render('basket', {});

    /*
    const basketItems = await basket.getAll(res.locals.currentUser.id);
    let items = [];
    if (basketItems) {
      items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await itemService.getOne(key);
        item.quantity = basketItems[key];
        return item;
      }));
    }
    return res.render('basket', { items });
    */
  });

  router.get('/remove/:itemId', async (req, res, next) => {
    return next('Not implemented');

    /*
    if (!res.locals.currentUser) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please log in first',
      });
      return res.redirect('/shop');
    }

    try {
      await basket.remove(req.params.itemId, res.locals.currentUser.id);
      req.session.messages.push({
        type: 'success',
        text: 'The item was removed from the the basket',
      });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error removing the item from the basket',
      });
      log.fatal(err);
      return res.redirect('/basket');
    }

    return res.redirect('/basket');
    */
  });

  router.get('/buy', async (req, res, next) => {
    return next('Not implemented');

    /*
    try {
      const userId = res.locals.currentUser.id;
      const user = res.locals.currentUser;

      // Get all basket items for a user
      const basketItems = await basket.getAll(userId);

      // be defensive
      if (!basketItems) {
        throw new Error('No items found in basket');
      }

      // Find the item for each basket entry and add the quantity to it
      // Return a new array with items plus quantity as new field
      const items = await Promise.all(Object.keys(basketItems).map(async (key) => {
        const item = await itemService.getOne(key);
        item.quantity = basketItems[key];
        return item;
      }));

      // Run this in a sequelize transaction
      await order.inTransaction(async (t) => {
        // Create a new order and add all items
        await order.create(user, items, t);
        // Clear the users basket
        await Promise.all(Object.keys(basketItems).map(async (key) => {
          await basket.remove(key, userId);
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
      log.fatal(err);
      return res.redirect('/basket');
    }
    */
  });

  return router;
};
