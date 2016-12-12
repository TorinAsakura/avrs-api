/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'

const RequestMessage = db.define('supportRequestMessage', {
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: Sequelize.ENUM('QUESTION', 'ANSWER'),
    defaultValue: 'QUESTION',
  },
  body: {
    type: Sequelize.TEXT,
  },
})

export default RequestMessage
