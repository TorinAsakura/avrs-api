import db from '../../../db'
import User from '../../users/models/user'
import Activation from '../../users/models/activation'
import RentalOperation from '../models/RentalOperation'

export default async (session) => {
  const user = await User.findOne({
    where: { id: session.userId },
    include: [{
      model: Activation,
      as: 'Activations',
    }],
  })
  const servicePlan = user.Activations[0].servicePlan

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
        package: servicePlan.name,
      }, { transaction }),
    ])
  })

  return operation
}
