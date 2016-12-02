import { lensPath, set } from 'ramda'
import ValidationErrors from '../errors/ValidationErrors'
import validator from '../validation/validator'

const validate = (constraints = []) =>
  async (req, res, next) => {
    const options = {
      format: 'detailed',
    }

    try {
      await Promise.all(constraints.map(item => validator.async(req.body, item, options)))
      next()
    } catch (errors) {
      const formatMessage = req.i18n.formatMessage

      const formatError = ({ error, ...values }) => ({ message: formatMessage(error, values) })
      const setError = (result, error) => set(lensPath(error.attribute.split('.')), formatError(error), result)

      next(new ValidationErrors(errors.reduce(setError, {})))
    }
  }

export default validate
