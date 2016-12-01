import User from '../models/user'

const uniqueUser = {
  email: {
    unique: {
      model: User,
    },
  },
}

export default uniqueUser
