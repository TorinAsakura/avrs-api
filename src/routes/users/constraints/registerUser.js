import User from '../models/user'

const registerUser = {
  email: {
    presence: {
      message: '^Can\'t be blank',
    },
    email: {
      message: '^Is not a valid email',
    },
  },
  firstName: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
  lastName: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
  'password.value': {
    password: true,
    presence: {
      message: '^Can\'t be blank',
    },
  },
  'password.confirmation': {
    password: true,
    equality: {
      attribute: 'password.value',
      message: '^These passwords don\'t match.',
    },
    presence: {
      message: '^Can\'t be blank',
    },
  },
  inviteCode: {
    exists: {
      model: User,
    },
  },
  activateUrl: {
    presence: {
      message: '^Can\'t be blank',
    },
    url: {
      allowLocal: true,
    },
  },
}

export default registerUser
