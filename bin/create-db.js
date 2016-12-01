/* eslint-disable no-console */
import { Client } from 'pg'
import config from '../src/config'

const createDB = async () => {
  const { host, username, password, database } = config.get('db')

  const client = new Client({ host, user: username, password })

  try {
    await client.connect()

    const { rowCount } = await client.query(`SELECT 1 FROM pg_database WHERE datname='${database}'`)

    if (!rowCount) {
      await client.query(`CREATE DATABASE ${database}`)
      console.log(`Database ${database} created.`)
    } else {
      console.log(`Database ${database} already exists.`)
    }
  } catch (error) {
    console.error(error)
  }

  await client.end()
}

createDB()
