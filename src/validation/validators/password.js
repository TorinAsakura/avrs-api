import PasswordValidator from 'password-validator'

const schema = new PasswordValidator()

schema
  .isMin(6)
  .has()
  .uppercase()
  .lowercase()
  .digits()

export default function (value) {
  if (!(value && schema.validate(value))) {
    return '^Password must include 6 or more characters, upper and lowercase letters, at least one number.'
  }

  return null
}
