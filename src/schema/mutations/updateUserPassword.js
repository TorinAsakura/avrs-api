import { updatePassword } from '../../routes/users/services'
import generateToken from '../../routes/users/utils/generateToken'
import updatePasswordCons from '../../routes/users/constraints/updatePassword'

export default async (_, params, { validate }) => {
  const errors = await validate([updatePasswordCons], params)

  if (errors) {
    return { errors }
  }

  const user = await updatePassword(params)

  return { errors: [], token: generateToken(user) }
}
