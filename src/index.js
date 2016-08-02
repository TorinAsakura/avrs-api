import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-middleware'
import serveStatic from 'serve-static'
import routes from './routes'
import errorsHandler from './middleware/errorsHandler'
import auth from './middleware/auth'

const unauthorizedRoutes = {
  path: [
    '/v1/users/auth',
    '/v1/users/register',
  ],
}

const app = new Express()

app.use(serveStatic(path.resolve(__dirname, '../api')))

swagger.hostUI(app, { path: '/' })

app.use(bodyParser.json())
app.use(auth.unless(unauthorizedRoutes))

routes.forEach(route => app.use('/v1', route))

app.use(errorsHandler)

export default app
