import { activate } from '../../routes/users/services'

export default async (_, { token }) => {
  await activate(token)

  return { success: true }
}
