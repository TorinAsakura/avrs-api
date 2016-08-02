import User from '../../models/user'
import comparePassword from '../../utils/comparePassword'
import ValidationError from '../../errors/ValidationError'

const error = {
  errors: [{
    message: 'Email or password invalid',
    path: ['email'],
  }],
}

export default async function auth({ email, password }) {
  const user = await User.findOne({ email })

  if (!user) {
    throw new ValidationError(error)
  }

  const isMatch = await comparePassword(user.password, password)

  if (!isMatch) {
    throw new ValidationError(error)
  }

  return user
}
