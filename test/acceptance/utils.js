import 'isomorphic-fetch'
import { lensPath, set } from 'ramda'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import createApp from '../../src/index'

export const createClient = () => {
  return new Promise((resolve, reject) => {
    const { app } = createApp()

    const server = app.listen(0, (error) => {
      if (error) {
        reject(error)
      }

      const client = new ApolloClient({
        networkInterface: createNetworkInterface({ uri: `http://127.0.0.1:${server.address().port}` }),
      })

      client.close = () => server.close()

      resolve(client)
    })
  })
}

export const formatErrors = (errors = []) => {
  return errors.reduce((result, error) => set(lensPath(error.key), error.message, result), {})
}
