import registerUser from '../../../routes/users/constraints/registerUser'
import uniqueUser from '../../../routes/users/constraints/uniqueUser'
import generateToken from '../../../routes/users/utils/generateToken'
import { register } from '../../../routes/users/services'

export default async (_, { activateUrl, inviteCode, ...params }, { validate }) => {
  const errors = await validate([registerUser, uniqueUser], { ...params, activateUrl })

  if (errors) {
    return { errors }
  }

  const user = await register(params, inviteCode, activateUrl)

  return { errors: [], token: generateToken(user) }
}
