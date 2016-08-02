import t from 'tcomb-validation'
import Password from './Password'

const PasswordType = t.struct({
  value: Password,
  confirmation: Password,
})

const check = ({ value, confirmation }) => value === confirmation

const PasswordWithConfirmation = t.subtype(PasswordType, check, 'PasswordWithConfirmation')

export default PasswordWithConfirmation
