import { sendActivation } from '../../../routes/users/services'

export default async (_, { activateUrl }, { user, checkAuth }) => {
  checkAuth()

  await sendActivation(user, activateUrl)

  return { success: true }
}
