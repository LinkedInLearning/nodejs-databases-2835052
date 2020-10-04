const express = require('express');

module.exports = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    return res.render('admin/orders', {});

    /*
    try {
      // Get all orders
      const orderResult = await order.getAll();
      // Run map on the data to convert it into nested arrays with orders and orderitems
      const orders = orderResult.map(item => item.get({ plain: true }));
      return res.render('admin/orders', { orders });
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error fetching the orders',
      });
      console.error(err);
      return next(err);
    }
    */
  });

  router.get('/setshipped/:orderId', async (req, res, next) => {
    return next('Not Implemented');

    /*
    try {
      await order.setStatus(req.params.orderId, 'Shipped');
      req.session.messages.push({
        type: 'success',
        text: 'Status updated',
      });
      return res.redirect('/admin/orders');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an updaeting the order',
      });
      console.error(err);
      return res.redirect('/admin/orders');
    }
    */
  });

  return router;
};

