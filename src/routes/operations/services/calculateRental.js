import db from '../../../db'
import User from '../../users/models/user'
import RentalOperation from '../models/RentalOperation'

export default async (session) => {
  const { servicePlan } = await session.getActivation()

  const amount = Math.floor((servicePlan.profitabilityPerHour * (session.time / 3600)) * 100) / 100

  if (amount < 0.01) {
    return null
  }

  const [, , operation] = await db.transaction((transaction) => {
    return Promise.all([
      User.update({
        rentalBalance: db.literal(`"rentalBalance" + ${amount}`),
      }, {
        where: {
          id: session.userId,
        },
      }, { transaction }),
      session.update({ status: 'CALCULATED' }, { transaction }),
      RentalOperation.create({
        amount,
        time: session.time,
        userId: session.userId,
        package: servicePlan.type,
      }, { transaction }),
    ])
  })

  return operation
}
