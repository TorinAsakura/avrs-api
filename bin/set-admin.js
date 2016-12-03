/* eslint-disable no-console */
/* eslint-disable consistent-return */
import User from '../src/routes/users/models/user'

const setAdmin = async () => {
  const [id] = process.argv.slice(2)

  if (!id) {
    return console.log('You must specify user id')
  }

  const user = await User.findOne({ where: { id } })

  if (!user) {
    return console.log('User not found')
  }

  await user.update({ isAdmin: true })

  console.log('User updated')
}

setAdmin()
