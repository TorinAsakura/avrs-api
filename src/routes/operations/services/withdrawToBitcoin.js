import db from '../../../db'
import User from '../../users/models/user'
import Operation from '../models/Operation'

export default async (amount, user) => {
  const [operation] = await db.transaction((transaction) => {
    return Promise.all([
      Operation.create({
        amount,
        userId: user.id,
        direction: 'EXTERNAL',
        externalType: 'BTC',
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
