function ValidationErrors(errors = []) {
  Error.captureStackTrace(this, this.constructor)
  this.name = 'ValidationErrors'
  this.errors = errors
}

ValidationErrors.prototype = Object.create(Error.prototype)
ValidationErrors.prototype.constructor = ValidationErrors

ValidationErrors.prototype.getErrors = function getErrors() {
  return this.errors
}

export default ValidationErrors
