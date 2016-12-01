/* eslint-disable no-console */
import { Client } from 'pg'
import config from '../src/config'

const dropDB = async () => {
  const { host, username, password, database } = config.get('db')

  const client = new Client({ host, user: username, password })

  try {
    await client.connect()

    const { rowCount } = await client.query(`SELECT 1 FROM pg_database WHERE datname='${database}'`)

    if (rowCount) {
      await client.query(`DROP DATABASE ${database}`)
      console.log(`Database ${database} droped.`)
    } else {
      console.log(`Database ${database} not exists.`)
    }
  } catch (error) {
    console.error(error)
  }

  await client.end()
}

dropDB()
