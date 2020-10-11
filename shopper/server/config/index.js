const pkg = require('../../package.json');

module.exports = {
  applicationName: pkg.name,
  mongodb: {
    url: 'mongodb://localhost:37017/shopper',
  }
};
