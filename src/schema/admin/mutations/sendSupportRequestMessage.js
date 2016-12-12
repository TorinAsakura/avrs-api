import { createRequestMessage } from '../../../routes/support/services'
import ValidationErrors from '../../../errors/ValidationErrors'

export default async (_, { requestId, message }, { i18n, checkAuth }) => {
  checkAuth()

  try {
    const reply = await createRequestMessage(requestId, 'ANSWER', message)

    return { message: reply, errors: [] }
  } catch (error) {
    if (error instanceof ValidationErrors) {
      return { errors: i18n.formatErrors(error.getErrors()) }
    }

    throw error
  }
}
