import User from '../models/user'
import comparePassword from '../utils/comparePassword'
import BadCredentials from '../../../errors/BadCredentials'

export default async function auth({ email, password }) {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    throw new BadCredentials()
  }

  const isMatch = await comparePassword(user.password, password)

  if (!isMatch) {
    throw new BadCredentials()
  }

  return user
}
