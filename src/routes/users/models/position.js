/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import Sequelize from 'sequelize'
import db from '../../../db'

const Position = db.define('position', {
  amount: {
    type: Sequelize.INTEGER,
  },
})

Position.getLevels = async function (users) {
  const positions = await Position.findAll({
    attributes: ['userId', [db.fn('sum', db.col('amount')), 'amount']],
    where: { userId: { $in: users } },
    group: ['position.userId'],
  })

  return positions
    .reduce((result, { userId, amount }) => {
      if (amount < 5000) {
        result[userId] = 0.05
      } else if (amount < 20000) {
        result[userId] = 0.1
      } else if (amount < 60000) {
        result[userId] = 0.13
      } else if (amount < 120000) {
        result[userId] = 0.16
      } else if (amount < 250000) {
        result[userId] = 0.18
      } else {
        result[userId] = 0.2
      }

      return result
    }, {})
}

export default Position
