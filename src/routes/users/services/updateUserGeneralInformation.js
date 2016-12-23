import { validate } from '../../../validation/validator'
import updateGeneralInformation from '../constraints/updateGeneralInformation'
import uniqueUser from '../constraints/uniqueUser'
import User from '../models/user'

export default async (id, params = {}) => {
  await validate([updateGeneralInformation], params)

  const user = await User.findOne({ where: { id } })

  if (user.email !== params.email) {
    await validate([uniqueUser], params)
  }

  await user.update(params)

  return user
}
