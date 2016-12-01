/* eslint-disable no-param-reassign */
import unless from 'express-unless'
import User from '../routes/users/models/user'
import Activation from '../routes/users/models/activation'
import verifyToken from '../routes/users/utils/verifyToken'

const auth = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return next()
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return next()
  }

  const user = await User.findById(payload.id, {
    include: [{
      model: Activation,
      as: 'Activations',
    }],
  })

  if (!user) {
    return next()
  }

  req.user = user

  return next()
}

auth.unless = unless

export default auth
