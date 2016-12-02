import client from './redisClient'
import logger from './logger'

export default function send(id, to, data = {}) {
  return new Promise(resolve => {
    client.publish('mailer', JSON.stringify({ id, to, data }), error => {
      if (error) {
        logger.error(error)
      }

      resolve()
    })
  })
}
