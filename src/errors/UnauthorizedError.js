function UnauthorizedError(message = 'UnauthorizedError') {
  Error.call(this, message)
  Error.captureStackTrace(this, this.constructor)

  this.name = 'UnauthorizedError'
  this.message = message
}

UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError

UnauthorizedError.prototype.getErrors = function getErrors() {
  return {}
}

export default UnauthorizedError
