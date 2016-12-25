import { applyLicense } from '../../../routes/users/services'

export default async (_, { license }, { user, checkAuth }) => {
  checkAuth()

  try {
    const activation = await applyLicense(user, license)

    return { activation }
  } catch (error) {
    return { error: error.message, activation: null }
  }
}
