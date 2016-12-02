import { auth } from '../../routes/users/services'
import generateToken from '../../routes/users/utils/generateToken'

export default async (_, params, { i18n }) => {
  try {
    const user = await auth(params)
    return { errors: [], token: generateToken(user) }
  } catch (error) {
    return {
      errors: [
        {
          key: ['email'],
          message: i18n.formatMessage('Email or password incorrect.'),
        },
      ],
    }
  }
}
