'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.addIndex('users', ['email'], { indicesType: 'UNIQUE' })
  },

  down: function (queryInterface) {
    return queryInterface.removeIndex('users', ['email'])
  }
};
