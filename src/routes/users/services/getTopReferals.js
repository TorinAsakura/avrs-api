import User from '../models/user'

export default async (user) => {
  return User.findAll({
    where: {
      networkPath: {
        $contains: user.networkPath,
      },
      // status not new
    },
    // order: '`salesBalance` DESC',
  })
}
