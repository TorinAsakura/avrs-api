import { createRequest } from '../../../routes/support/services'
import ValidationErrors from '../../../errors/ValidationErrors'

export default async (_, { subject, message }, { i18n, user, checkAuth }) => {
  checkAuth()

  try {
    const request = await createRequest(user.id, subject, message)

    return { request, errors: [] }
  } catch (error) {
    if (error instanceof ValidationErrors) {
      return { errors: i18n.formatErrors(error.getErrors()) }
    }

    throw error
  }
}
