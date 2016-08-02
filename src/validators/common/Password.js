import t from 'tcomb-validation'
import PasswordValidator from 'password-validator'

const schema = new PasswordValidator()

schema
  .isMin(6)
  .has()
  .uppercase()
  .lowercase()
  .digits()

const Password = t.subtype(t.String, value => schema.validate(value), 'Password')

export default Password
