import t, { validate } from 'tcomb-validation'
import User from '../../models/user'
import RegisterUser from '../../validators/user/RegisterUser'
import ValidationError from '../../errors/ValidationError'
import saltPassword from '../../utils/saltPassword'

export default async function register(user = {}) {
  const validation = validate(user, RegisterUser)

  if (!validation.isValid()) {
    throw new ValidationError(validation)
  }

  const exists = await User.findOne({ email: user.email })

  const existsValidation = validate(exists, t.Nil, { path: ['email'] })

  if (!existsValidation.isValid()) {
    throw new ValidationError(existsValidation)
  }

  const password = await saltPassword(user.password.value)

  return await new User({ ...user, password }).save()
}
