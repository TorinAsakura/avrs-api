const createExternalRequest = {
  email: {
    presence: {
      message: '^Can\'t be blank',
    },
    email: {
      message: '^Is not a valid email',
    },
  },
  subject: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
  message: {
    presence: {
      message: '^Can\'t be blank',
    },
  },
}

export default createExternalRequest
