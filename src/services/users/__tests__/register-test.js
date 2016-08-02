import { expect } from 'chai'
import clearDB from 'mocha-mongoose'
import register from '../register'
import config from '../../../config'

describe('Register user service', () => {
  before(done => {
    clearDB(config.db())(error => {
      if (error) {
        return done(error)
      }

      return done()
    })
  })

  it('check invalid email', async () => {
    try {
      await register({ email: 'invalid@example' })
    } catch (error) {
      expect(error.toJSON()).to.have.deep.property('email.message')
    }
  })

  it('check valid email', async () => {
    try {
      await register({ email: 'valid@example.com' })
    } catch (error) {
      expect(error.toJSON()).to.not.have.property('email')
    }
  })

  it('check invalid password', async () => {
    try {
      await register({ password: { value: 'unsecured' } })
    } catch (error) {
      expect(error.toJSON()).to.have.deep.property('password.value.message')
      expect(error.toJSON()).to.have.deep.property('password.confirmation.message')
    }
  })

  it('check invalid password confirmation', async () => {
    try {
      await register({ password: { value: 'Secured11', confirmation: 'Secured22' } })
    } catch (error) {
      expect(error.toJSON()).to.have.deep.property('password.message')
    }
  })

  it('check valid password', async () => {
    try {
      await register({ password: { value: 'Secured11', confirmation: 'Secured11' } })
    } catch (error) {
      expect(error.toJSON()).to.not.have.property('password')
    }
  })

  it('check duplication validation', async () => {
    const user = {
      email: 'duplicate@example.com',
      password: {
        value: 'Secured11',
        confirmation: 'Secured11',
      },
    }

    try {
      await register(user)
      await register(user)
    } catch (error) {
      expect(error.toJSON()).to.have.deep.property('email.message')
    }
  })

  it('check register', async () => {
    const user = {
      email: 'user@example.com',
      password: {
        value: 'Secured11',
        confirmation: 'Secured11',
      },
    }

    const created = await register(user)
    expect(created).to.have.property('_id')
  })
})
