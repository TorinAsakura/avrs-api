import redis from 'redis'
import bluebird from 'bluebird'
import config from './config'
import logger from './logger'

bluebird.promisifyAll(redis.RedisClient.prototype)

const client = redis.createClient(config.get('redis'))

client.on('error', error => logger.error(error))

export default client
