import db from '../../../db'
import User from '../../users/models/user'
import ReferalOperation from '../models/ReferalOperation'

export default async (rentalOperation) => {
  const { agentsNetworkPath } = await User.findOne({
    attributes: ['networkPath'],
    where: { id: rentalOperation.userId },
  })

  const agents = await User.findAll({
    attributes: ['id', 'salesBalance'],
    where: {
      id: {
        $in: agentsNetworkPath,
      },
    },
  })

  const { result: operations } = agents.reverse().reduce(({ prev, total, result }, agent) => {
    if (!(agent.level > prev)) {
      return { prev, total, result }
    }

    const level = agent.level - prev

    if (level + total > 0.2) {
      return { prev, total, result }
    }

    const bonus = Math.floor((rentalOperation.amount * level) * 100) / 100

    if (bonus < 0.01) {
      return {
        prev: agent.level,
        total: level + total,
        result,
      }
    }

    return {
      prev: agent.level,
      total: level + total,
      result: [
        ...result,
        {
          amount: bonus,
          percent: level,
          userId: agent.id,
          package: rentalOperation.package,
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
        { referalBalance: db.literal(`"referalBalance" + ${amount}`) },
        { where: { id: userId } },
        { transaction },
      )

    return Promise.all(
      operations.map(updateBalance)
                .concat([ReferalOperation.bulkCreate(operations, { transaction })]),
    )
  })
}
