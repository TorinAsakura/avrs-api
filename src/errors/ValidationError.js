const getMessage = errors => `Validation error.\n${errors.map(error => error.message).join('\n')}`

function ValidationError({ errors = [], value } = {}) {
  const message = getMessage(errors)

  Error.call(this, message)
  Error.captureStackTrace(this, this.constructor)

  this.name = 'ValidationError'
  this.message = message
  this.code = 422
  this.status = 422
  this.errors = errors
  this.value = value
}

ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = ValidationError

ValidationError.prototype.getErrors = function getErrors() {
  return this.errors
}

export default ValidationError
