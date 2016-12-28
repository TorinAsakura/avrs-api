import User from '../models/user'
import saltPassword from '../utils/saltPassword'
import sendActivation from './sendActivation'

export default async (params = {}, inviteCode, activateUrl) => {
  const password = await saltPassword(params.password.value)
  let networkPath = []

  if (inviteCode && inviteCode.length > 0) {
    const leader = await User.findOne({ where: { inviteCode } })

    networkPath = leader.networkPath
  }

  const user = await User.create({ ...params, password, networkPath })

  await sendActivation(user, activateUrl)

  return user
}
