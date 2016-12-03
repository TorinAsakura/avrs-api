import validator from 'validate.js'
import password from './validators/password'
import unique from './validators/unique'
import exists from './validators/exists'
import ValidationErrors from '../errors/ValidationErrors'

validator.validators.password = password
validator.validators.unique = unique
validator.validators.exists = exists

export const validate = async (constraints = [], value, options = { format: 'detailed' }) => {
  try {
    return await Promise.all(constraints.map(item => validator.async(value, item, options)))
  } catch (errors) {
    throw new ValidationErrors(errors)
  }
}

export default (i18n) => {
  return async (constraints = [], value) => {
    try {
      await validate(constraints, value)
    } catch (errors) {
      return errors.getErrors().map(({ attribute, error, ...values }) => ({
        key: attribute.split('.'),
        message: i18n.formatMessage(error, values),
      }))
    }

    return null
  }
}
