import User from '../models/user'

export default async function updateProfile(id, data = {}) {
  const user = await User.findOne({ where: { id } })
  await user.update(data)

  return user
}
