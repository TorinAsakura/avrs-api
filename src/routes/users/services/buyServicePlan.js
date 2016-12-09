import db from '../../../db'
import User from '../models/user'
import Activation from '../models/activation'

export default async function buyServicePlan(user, servicePlan) {
  const [active] = user.Activations.filter(activation => activation.isActive() && !activation.isExpired())

  let data = null

  if (active) {
    data = {
      servicePlan,
      userId: user.id,
    }
  } else {
    data = {
      servicePlan,
      startAt: new Date(),
      userId: user.id,
      status: 'ACTIVE',
    }
  }

  const activation = await Activation.create(data)

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
