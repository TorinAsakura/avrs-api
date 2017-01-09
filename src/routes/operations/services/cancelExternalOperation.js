import db from '../../../db'
import User from '../../users/models/user'
import Operation from '../models/Operation'

export default async (id) => {
  const operation = await Operation.findById(id)

  await db.transaction((transaction) => {
    return Promise.all([
      Operation.update(
        { status: 'NOT_PERFORMED' },
        { where: { id } },
        { transaction },
      ),
      User.update(
        { rentalBalance: db.literal(`"rentalBalance" + ${operation.amount}`) },
        { where: { id: operation.userId } },
        { transaction },
      ),
    ])
  })

  return await Operation.findById(id, {
    include: [{
      model: User,
      as: 'user',
    }],
  })
}
