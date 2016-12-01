function BadCredentials(message = 'Bad credentials') {
  Error.call(this, message)
  Error.captureStackTrace(this, this.constructor)

  this.name = 'BadCredentials'
  this.message = message
}

BadCredentials.prototype = Object.create(Error.prototype)
BadCredentials.prototype.constructor = BadCredentials

export default BadCredentials
