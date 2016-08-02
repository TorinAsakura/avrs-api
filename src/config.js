import nconf from 'nconf'

nconf.argv().env({ separator: '_', lowerCase: true })

nconf.defaults({
  mongo: {
    host: 'mongo',
    port: 27017,
    db: 'avrs',
  },
  auth: {
    secret: 'Dev secret string',
  },
})

nconf.db = () => {
  const { host, port, db } = nconf.get('mongo')

  return `mongodb://${host}:${port}/${db}`
}

export default nconf
