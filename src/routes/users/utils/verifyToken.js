import jwt from 'jsonwebtoken'
import config from '../../../config'

export default function verifyToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, config.get('auth:secret'), (error, payload) => {
      if (error) {
        resolve(null)
      } else {
        resolve(payload)
      }
    })
  })
}
