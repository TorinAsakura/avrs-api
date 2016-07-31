/* eslint-disable no-console */
import app from '../src'

app.listen(3000, error => {
  if (error) {
    throw error
  }

  console.info('Server listening on port %s', 3000)
})
