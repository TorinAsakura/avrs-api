import Express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = new Express()

app.use(bodyParser.json())

routes.forEach(route => app.use('/v1', route))

export default app
