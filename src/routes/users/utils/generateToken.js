import jwt from 'jsonwebtoken'
import config from '../../../config'

export default function generateToken({ id, email }) {
  const token = jwt.sign({ id }, config.get('auth:secret'))

  return {
    id,
    email,
    token,
  }
}
