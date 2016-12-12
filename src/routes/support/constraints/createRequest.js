const createRequest = {
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

export default createRequest
