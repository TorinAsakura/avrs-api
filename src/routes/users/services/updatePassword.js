import User from '../models/user'
import NotFoundError from '../../../errors/NotFoundError'
import saltPassword from '../utils/saltPassword'

export default async function updatePassword({ token, password }) {
  const user = await User.findOne({ where: { resetToken: token } })

  if (!user) {
    throw new NotFoundError()
  }

  user.password = await saltPassword(password.value)
  user.resetToken = null

  return await user.save()
}
