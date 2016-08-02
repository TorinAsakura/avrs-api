import { Schema } from 'mongoose'
import db from '../db'

const User = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
})

const model = db.model('User', User)

export default model
