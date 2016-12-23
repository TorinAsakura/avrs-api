/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import moment from 'moment'
import db from '../../../db'
import config from '../../../config'

const Activation = db.define('activation', {
  license: {
    type: Sequelize.STRING,
  },
  startAt: {
    type: Sequelize.DATE,
  },
  usedTime: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM('INACTIVE', 'ACTIVE', 'STOPED', 'EXPIRED'), // eslint-disable-line new-cap
    defaultValue: 'INACTIVE',
  },
  servicePlan: {
    type: Sequelize.STRING,
    set: function ({ type, period }) {
      this.setDataValue('servicePlan', `${type}_${period}`)
    },
    get: function () {
      if (!this.getDataValue('servicePlan')) {
        return null
      }

      const [type, period] = this.getDataValue('servicePlan').split('_')

      const [plan] = config.get('servicePlans')
                           .filter(item => item.type === type && item.period === parseInt(period, 10))

      if (plan) {
        return plan
      }

      // remove with paln ids

      const servicePlan = this.getDataValue('servicePlan')

      const [prevPlan] = config.get('servicePlans').filter(item => item.id === servicePlan)

      return prevPlan
    },
  },
}, {
  getterMethods: {
    leftTime() {
      return this.getServicePlanPeriod() - this.getUsedTime()
    },
  },
  instanceMethods: {
    getServicePlanPeriod() {
      if (!this.servicePlan) {
        return 30 * 24 * 60 * 60
      }

      return this.servicePlan.period * 24 * 60 * 60
    },
    getUsedTime() {
      return this.isActive() ? moment(moment()).diff(this.startAt, 'seconds') + this.usedTime : this.usedTime
    },
    isInactive() {
      return this.status === 'INACTIVE'
    },
    isActive() {
      return this.status === 'ACTIVE'
    },
    isStopped() {
      return this.status === 'STOPPED'
    },
    isExpired() {
      return this.status === 'EXPIRED'
        || (this.isActive() && this.getServicePlanPeriod() < this.getUsedTime())
    },
  },
})

export default Activation
