import { sendResetPassword } from '../../routes/users/services'
import resetPassword from '../../routes/users/constraints/resetPassword'

export default async (_, params, { validate }) => {
  const errors = await validate([resetPassword], params)

  if (errors) {
    return { errors }
  }

  await sendResetPassword(params)

  return { errors: [] }
}
