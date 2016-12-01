import bcrypt from 'bcryptjs'

export default function comparePassword(password, compare) {
  return new Promise((resolve) => {
    bcrypt.compare(compare, password, (error, isMatch) => {
      if (error) {
        resolve(false)
      } else {
        resolve(isMatch)
      }
    })
  })
}
