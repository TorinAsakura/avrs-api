/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'
import User from '../../users/models/user'

const Operation = db.define('operation', {
  date: {
    type: Sequelize.DATE,
    defaultValue: function () {
      return new Date()
    },
  },
  amount: {
    type: Sequelize.FLOAT,
  },
  direction: {
    type: Sequelize.ENUM('INTERNAL', 'EXTERNAL'),
    defaultValue: 'INTERNAL',
  },
  status: {
    type: Sequelize.ENUM('SENT', 'PERFORMED', 'NOT_PERFORMED'),
    defaultValue: 'SENT',
  },
  externalType: {
    type: Sequelize.ENUM('CARD', 'BTC'),
  },
  data: {
    type: Sequelize.JSONB,
    defaultValue: {},
  },
})

Operation.belongsTo(User)

export default Operation
