import User from '../models/user'
import NotFoundError from '../../../errors/NotFoundError'

export default async function activate(token) {
  const user = await User.findOne({ where: { activateToken: token } })

  if (!user) {
    throw new NotFoundError()
  }

  user.activateToken = null

  await user.save()
}
