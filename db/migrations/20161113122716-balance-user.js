'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'balance', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'balance')
  }
};
