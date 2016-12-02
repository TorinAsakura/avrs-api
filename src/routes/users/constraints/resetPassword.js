import User from '../models/user'

const resetPassword = {
  email: {
    presence: {
      message: '^Can\'t be blank',
    },
    email: {
      message: '^Is not a valid email',
    },
    exists: {
      model: User,
    },
  },
  resetUrl: {
    presence: {
      message: '^Can\'t be blank',
    },
    url: {
      allowLocal: true,
    },
  },
}

export default resetPassword
