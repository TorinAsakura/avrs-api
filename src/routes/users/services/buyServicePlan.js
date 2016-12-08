import moment from 'moment'
import db from '../../../db'
import User from '../models/user'
import Activation from '../models/activation'

export default async function buyServicePlan(user, servicePlan) {
  const [lastExpired] = user.Activations.sort((left, right) => {
    return moment.utc(right.expireAt).diff(moment.utc(left.expireAt))
  })

  const startAt = lastExpired ? lastExpired.expireAt : new Date()

  const activation = await Activation.create({ startAt, servicePlan, userId: user.id })

  if (user.status === 'NEW') {
    user.status = 'ACTIVE'
    await user.save()
  }

  await db.transaction(transaction =>
    Promise.all(
      user.networkPath.map(id =>
        User.update(
          { salesBalance: db.literal(`"salesBalance" + ${activation.servicePlan.price}`) },
          { where: { id } },
          { transaction },
        ),
      ),
    ),
  )

  return activation.servicePlan
}
