const express = require('express');
const userService = require('../../../services/userService');

module.exports = (config) => {
  const router = express.Router();
  const log = config.logger;

  // Do you see the keyword 'async' here?
  // If this looks unfamiliar, this is a new language feature of JavaScript
  // that made it into Node.js in version 8
  // Functions that are marked with async can use the await keyword which
  // lets you basically use asynchronous functions as if they were synchronous.
  router.get('/:userId?', async (req, res, next) => {
    try {
      const users = await userService.getAll();

      let user = null;

      // The optional userId param was passed
      if (req.params.userId) {
        user = await userService.getOne(req.params.userId);
      }
      return res.render('admin/user', {
        users,
        user,
      });
    } catch (err) {
      return next(err);
    }
  });

  // Save or update user
  router.post('/', async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    // Add this here because on update we might want to keep the password as it is
    if (!email || (!password && !req.body.userId)) {
      req.session.messages.push({
        type: 'warning',
        text: 'Please enter email address and password!',
      });
      return res.redirect('/admin/user');
    }
    try {
      // If there was no existing user we now want to create a new user object
      if (!req.body.userId) {
        await userService.create({ email, password });
      } else {
        const userData = {
          email,
        };
        // Add this if because password does not need to be changed on updated
        if (password) {
          userData.password = password;
        }
        await userService.update(req.body.userId, userData);
      }
      req.session.messages.push({
        type: 'success',
        text: `The user was ${req.body.userId ? 'updated' : 'created'} successfully!`,
      });
      return res.redirect('/admin/user');
    } catch (err) {
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error while saving the user!',
      });
      log.fatal(err);
      return res.redirect('/admin/user');
    }
  });

  // Delete user
  router.get('/delete/:userId', async (req, res) => {
    try {
      const deleteResult = await userService.remove(req.params.userId);
      if (deleteResult === 0) {
        throw new Error('Result returned zero deleted documents!');
      }
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: 'danger',
        text: 'There was an error while deleting the user!',
      });
      log.fatal(err);
      return res.redirect('/admin/user');
    }
    // Let the user knows that everything went fine
    req.session.messages.push({
      type: 'success',
      text: 'The user was successfully deleted!',
    });
    return res.redirect('/admin/user');
  });


  router.get('/impersonate/:userId', (req, res) => {
    req.session.userId = req.params.userId;
    req.session.messages.push({
      type: 'success',
      text: 'User successfully switched',
    });
    return res.redirect('/admin/user');
  });

  return router;
};
