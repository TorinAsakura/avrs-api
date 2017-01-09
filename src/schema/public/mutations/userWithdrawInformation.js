import { updateUserWithdraw } from '../../../routes/users/services'
import ValidationErrors from '../../../errors/ValidationErrors'

export default async (_, params, { i18n, user, checkAuth }) => {
  checkAuth()

  try {
    const updated = await updateUserWithdraw(user.id, params)

    return { user: updated, errors: [] }
  } catch (error) {
    if (error instanceof ValidationErrors) {
      return { errors: i18n.formatErrors(error.getErrors()) }
    }

    throw error
  }
}
