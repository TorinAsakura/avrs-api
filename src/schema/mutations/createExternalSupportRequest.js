import { createExternalRequest } from '../../routes/support/services'
import ValidationErrors from '../../errors/ValidationErrors'

export default async (_, { email, subject, message }, { i18n }) => {
  try {
    const request = await createExternalRequest(email, subject, message)

    return { request, errors: [] }
  } catch (error) {
    if (error instanceof ValidationErrors) {
      return { errors: i18n.formatErrors(error.getErrors()) }
    }

    throw error
  }
}
