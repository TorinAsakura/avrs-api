'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('supportRequestMessages', 'type', {
      type: Sequelize.ENUM('QUESTION', 'ANSWER'),
      defaultValue: 'QUESTION',
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('supportRequestMessages', 'type')
  }
};
