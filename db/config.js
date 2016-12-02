require('babel-register')

var config = require('../src/config').default

module.exports = {
  production: config.get('db'),
  development: config.get('db'),
  test: config.get('db'),
}
