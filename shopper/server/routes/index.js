const express = require('express');
const userRoute = require('./admin/user');
const itemRoute = require('./admin/item');
const orderRoute = require('./admin/orders');
const shopRoute = require('./shop');
const basketRoute = require('./basket');

module.exports = (config) => {
  const router = express.Router();
  router.get('/', (req, res) => {
    res.render('index');
  });

  router.use('/shop', shopRoute(config));
  router.use('/basket', basketRoute(config));

  // Secure that route in real life applications
  router.use('/admin/user', userRoute(config));
  router.use('/admin/item', itemRoute(config));
  router.use('/admin/orders', orderRoute(config));

  return router;
};
