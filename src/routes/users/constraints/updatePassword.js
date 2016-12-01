const updatePassword = {
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
  token: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
}

export default updatePassword
