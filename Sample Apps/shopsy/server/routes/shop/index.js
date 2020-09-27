const express = require('express');


module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;

  router.get('/', async (req, res) => {
    return res.render('shop', { });
    /*
    const items = await itemService.getAll();
    return res.render('shop', { items });
    */
  });

  router.get('/tobasket/:itemId', async (req, res, next) => {
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
      await basket.add(req.params.itemId, res.locals.currentUser.id);
      req.session.messages.push({
        type: 'success',
        text: 'The item was added to the basket',
      });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error adding the item to the basket',
      });
      log.fatal(err);
    }

    return res.redirect('/shop');
    */
  });

  return router;
};
