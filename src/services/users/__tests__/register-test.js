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
      expect(error.getErrors()).to.have.deep.property('[0].path[0]', 'email')
    }
  })

  it('check valid email', async () => {
    try {
      await register({ email: 'valid@example.com' })
    } catch (error) {
      expect(error.getErrors()).to.not.have.deep.property('[0].path[0]', 'email')
    }
  })

  it('check invalid password', async () => {
    try {
      await register({ email: 'valid@example.com', password: { value: 'unsecured' } })
    } catch (error) {
      expect(error.getErrors()).to.have.deep.property('[0].path[1]', 'value')
      expect(error.getErrors()).to.have.deep.property('[1].path[1]', 'confirmation')
    }
  })

  it('check invalid password confirmation', async () => {
    try {
      await register({ email: 'valid@example.com', password: { value: 'Secured11', confirmation: 'Secured22' } })
    } catch (error) {
      expect(error.getErrors()).to.have.deep.property('[0].path[0]', 'password')
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
      expect(error.getErrors()).to.have.deep.property('[0].path[0]', 'email')
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
