import jwt from 'jsonwebtoken'
import config from '../config'

export default function generateToken({ _id, email }) {
  const token = jwt.sign({ _id }, config.get('auth:secret'))

  return {
    _id,
    email,
    token,
  }
}
