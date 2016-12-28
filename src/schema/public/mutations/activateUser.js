import { activate } from '../../../routes/users/services'

export default async (_, { token }) => {
  try {
    await activate(token)
  } catch (error) {
    return { success: false }
  }

  return { success: true }
}
