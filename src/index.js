import Express from 'express'
import sio from 'socket.io'
import cors from 'cors'
import socketioJwt from 'socketio-jwt'
import graphqlHTTP from 'express-graphql'
import config from './config'
import { requestLogger } from './logger'
import errorsHandler from './middleware/errorsHandler'
import validator from './middleware/validator'
import auth from './middleware/auth'
import i18n from './middleware/i18n'
import communicator from './communicator'
import Schema from './schema/public'
import AdminSchema from './schema/admin'

export default function createApp(app = new Express(), io = sio()) {
  app.use(requestLogger)
  app.use(cors())
  app.use(i18n())
  app.use(auth.unless([]))
  app.use(validator())

  app.use('/admin', async (req, res) => { // eslint-disable-line consistent-return
    if (!(req.user && req.user.isAdmin)) {
      return res.sendStatus(401)
    }

    graphqlHTTP((req, res) => ({ // eslint-disable-line no-shadow
      schema: AdminSchema,
      graphiql: false,
      context: {
        user: req.user,
        validate: req.validate,
        i18n: req.i18n,
        checkAuth() {
          if (!req.user) {
            res.send(401)
          }
        },
      },
    }))(req, res)
  })

  app.use('/', graphqlHTTP((req, res) => ({
    schema: Schema,
    graphiql: false,
    context: {
      user: req.user,
      validate: req.validate,
      i18n: req.i18n,
      checkAuth() {
        if (!req.user) {
          res.send(401)
        }
      },
    },
  })))

  app.use(errorsHandler)

  io.accounts = {}

  io.set('authorization', socketioJwt.authorize({
    secret: config.get('auth:secret'),
    handshake: true,
  }))

  io.on('connection', async (socket) => {
    communicator(io, socket)
  })

  return { app, io }
}
