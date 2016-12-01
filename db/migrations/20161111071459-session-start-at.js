'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('sessions', 'startAt', { type: Sequelize.DATE })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('sessions', 'startAt')
  }
};
