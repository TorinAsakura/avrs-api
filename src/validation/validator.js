import validator from 'validate.js'
import password from './validators/password'
import unique from './validators/unique'
import exists from './validators/exists'

validator.validators.password = password
validator.validators.unique = unique
validator.validators.exists = exists

export default (i18n) => {
  return async (constraints = [], value) => {
    const options = {
      format: 'detailed',
    }

    try {
      await Promise.all(constraints.map(item => validator.async(value, item, options)))
    } catch (errors) {
      return errors.map(({ attribute, error, ...values }) => ({
        key: attribute.split('.'),
        message: i18n.formatMessage(error, values),
      }))
    }

    return null
  }
}
