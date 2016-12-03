/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'

const ExternalSupportRequest = db.define('externalSupportRequest', {
  status: {
    type: Sequelize.ENUM('NEW', 'CLOSED'), // eslint-disable-line new-cap
    defaultValue: 'NEW',
  },
  email: {
    type: Sequelize.STRING,
  },
  subject: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.TEXT,
  },
})

export default ExternalSupportRequest
