import Sequelize from 'sequelize'
import db from '../../../db'
import Session from './session'

const Stat = db.define('stat', {
  value: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
})

Stat.belongsTo(Session)

export default Stat
