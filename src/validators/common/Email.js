import t from 'tcomb-validation'

const Email = t.subtype(t.String, value => /.+@.+\..+/.test(value), 'Email')

Email.getValidationErrorMessage = () => 'Invalid email value {actual}'

export default Email
