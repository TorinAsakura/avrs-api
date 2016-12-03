import db from '../../../db'
import User from '../../users/models/user'
import Position from '../../users/models/position'
import ReferalOperation from '../models/ReferalOperation'

export default async (rentalOperation) => {
  const { agentsNetworkPath: agents } = await User.findOne({
    attributes: ['networkPath'],
    where: { id: rentalOperation.userId },
  })

  const levels = await Position.getLevels(agents)

  const { result: operations } = agents.reverse().reduce(({ prev, total, result }, userId) => {
    if (!(levels[userId] > prev)) {
      return { prev, total, result }
    }

    const level = levels[userId] - prev

    if (level + total > 0.2) {
      return { prev, total, result }
    }

    const bonus = Math.floor((rentalOperation.amount * level) * 100) / 100

    if (bonus < 0.01) {
      return {
        prev: levels[userId],
        total: level + total,
        result,
      }
    }

    return {
      prev: levels[userId],
      total: level + total,
      result: [
        ...result,
        {
          userId,
          amount: bonus,
          package: rentalOperation.package,
          percent: level,
          participantId: rentalOperation.userId,
        },
      ],
    }
  }, { prev: 0, total: 0, result: [] })

  if (operations.length === 0) {
    return
  }

  await db.transaction((transaction) => {
    const updateBalance = ({ userId, amount }) =>
      User.update(
        { balance: db.literal(`balance + ${amount}`) },
        { where: { id: userId } },
        { transaction },
      )

    return Promise.all(
      operations.map(updateBalance)
                .concat([ReferalOperation.bulkCreate(operations, { transaction })]),
    )
  })
}
