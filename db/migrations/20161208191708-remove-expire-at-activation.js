'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('activations', 'expireAt')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('activations', 'usedTime', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  }
};
