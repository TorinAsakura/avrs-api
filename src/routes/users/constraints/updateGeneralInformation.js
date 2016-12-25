const updateGeneralInformation = {
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
}

export default updateGeneralInformation
