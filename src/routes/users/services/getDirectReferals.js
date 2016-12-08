import User from '../models/user'

export default async (user) => {
  return await User.findAll({
    where: {
      networkPath: {
        $eq: user.networkPath,
      },
    },
  })
}
