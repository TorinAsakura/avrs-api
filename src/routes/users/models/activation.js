/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import moment from 'moment'
import db from '../../../db'
import config from '../../../config'

const Activation = db.define('activation', {
  startAt: {
    type: Sequelize.DATE,
  },
  expireAt: {
    type: Sequelize.DATE,
  },
  servicePlan: {
    type: Sequelize.STRING,
    set: function (servicePlan) {
      const [plan] = config.get('servicePlans').filter(item => item.id === servicePlan)

      this.setDataValue('expireAt', moment(this.getDataValue('startAt')).add(plan.period, 'day').toDate())
      this.setDataValue('servicePlan', servicePlan)
    },
    get: function () {
      const servicePlan = this.getDataValue('servicePlan')

      if (!servicePlan) {
        return null
      }

      const [plan] = config.get('servicePlans').filter(item => item.id === servicePlan)

      return plan
    },
  },
})

export default Activation
