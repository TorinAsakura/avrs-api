/* eslint-disable no-console */
import { Server as server } from 'http'
import createApp from '../src'

const { app, io } = createApp()
const http = server(app)

io.attach(http)

http.listen(3000, (error) => {
  if (error) {
    throw error
  }

  console.info('Server listening on port %s', 3000)
})
