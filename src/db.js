import mongoose from 'mongoose'
import { Promise } from 'es6-promise'
import config from './config'

mongoose.Promise = Promise

const db = mongoose.createConnection(config.db())

export default db
