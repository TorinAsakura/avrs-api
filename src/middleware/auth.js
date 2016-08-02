/* eslint-disable no-param-reassign */
import unless from 'express-unless'
import User from '../models/user'
import verifyToken from '../utils/verifyToken'
import UnauthorizedError from '../errors/UnauthorizedError'

const auth = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return next(new UnauthorizedError())
  }

  const payload = await verifyToken(token)

  if (!payload) {
    return next(new UnauthorizedError())
  }

  const user = await User.findOne({ _id: payload._id })

  if (!user) {
    return next(new UnauthorizedError())
  }

  req.user = {
    _id: user._id,
    email: user.email,
  }

  return next()
}

auth.unless = unless

export default auth
