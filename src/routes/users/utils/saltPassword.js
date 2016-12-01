import bcrypt from 'bcryptjs'

export default function saltPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        reject(error)
      }

      bcrypt.hash(password, salt, (hashError, hash) => {
        if (hashError) {
          reject(hashError)
        }

        resolve(hash)
      })
    })
  })
}
