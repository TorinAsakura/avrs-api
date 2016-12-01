/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'
import User from '../../users/models/user'

const ReferalOperation = db.define('referalOperation', {
  date: {
    type: Sequelize.DATE,
    defaultValue: function () {
      return new Date()
    },
  },
  amount: {
    type: Sequelize.FLOAT,
  },
  percent: {
    type: Sequelize.FLOAT,
  },
  package: {
    type: Sequelize.STRING,
  },
})

ReferalOperation.belongsTo(User)
ReferalOperation.belongsTo(User, { foreignKey: 'participantId', as: 'participant' })

export default ReferalOperation
