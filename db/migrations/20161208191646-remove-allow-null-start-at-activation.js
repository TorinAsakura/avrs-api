'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('activations', 'startAt', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('activations', 'startAt', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  }
};
