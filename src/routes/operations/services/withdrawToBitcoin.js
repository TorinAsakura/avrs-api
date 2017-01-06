import db from '../../../db'
import User from '../../users/models/user'
import Operation from '../models/Operation'

export default async (amount, number, user) => {
  const data = {
    number,
    type: 'bitcoin',
  }

  const [operation] = await db.transaction((transaction) => {
    return Promise.all([
      Operation.create({
        data,
        amount,
        userId: user.id,
        direction: 'EXTERNAL',
      }),
      User.update(
        {
          rentalBalance: db.literal(`"rentalBalance" - ${amount}`),
        },
        { where: { id: user.id } },
        { transaction },
      ),
    ])
  })

  return operation
}
