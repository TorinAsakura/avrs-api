import User from '../models/user'

export default async ({ id }) => {
  const user = await User.findById(id)

  const participants = await User.findAll({
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
    },
  })

  return participants
}
