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
  phone: {
    presence: {
      message: '^Can\'t be blank',
    },
    phone: true,
  },
  sex: {
    inclusion: ['male', 'female'],
  },
  birthday: {
    presence: {
      message: '^Can\'t be blank',
    },
    datetime: true,
  },
  country: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
  captcha: {
    captcha: true,
  },
  agreement: {
    inclusion: {
      within: [true],
      message: '^This value is required',
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
