import User from '../models/user'

export default async () => {
  return User.findAll()
}
