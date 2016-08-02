import t from 'tcomb-validation'
import Email from '../common/Email'
import PasswordWithConfirmation from '../common/PasswordWithConfirmation'

const RegisterUser = t.struct({
  email: Email,
  password: PasswordWithConfirmation,
})

export default RegisterUser
