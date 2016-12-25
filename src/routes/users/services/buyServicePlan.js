import db from '../../../db'
import config from '../../../config'
import User from '../models/user'
import Activation from '../models/activation'

export default async function buyServicePlan(user, servicePlanId) {
  const [active] = user.Activations.filter(activation => activation.isActive() && !activation.isExpired())

  const [type, period] = servicePlanId.split('_')

  const [servicePlan] = config.get('servicePlans')
                              .filter(plan => plan.type === type && plan.period === parseInt(period, 10))

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
