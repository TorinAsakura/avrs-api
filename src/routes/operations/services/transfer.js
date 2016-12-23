import db from '../../../db'
import User from '../../users/models/user'
import Operation from '../models/Operation'


export default async (amount, user) => {
  const [operation] = await db.transaction((transaction) => {
    return Promise.all([
      Operation.create({ amount, userId: user.id }),
      User.update(
        {
          rentalBalance: db.literal(`"rentalBalance" + ${amount}`),
          referalBalance: db.literal(`"referalBalance" - ${amount}`),
        },
        { where: { id: user.id } },
        { transaction },
      ),
    ])
  })

  return operation
}
