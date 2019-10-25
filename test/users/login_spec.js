/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/User')

const validUser = {
  username: 'validUsername',
  email: 'valid@email.com',
  password: 'testPassword',
  passwordConfirmation: 'testPassword'
}

const validLogin = {
  email: validUser.email,
  password: validUser.password
}

describe('POST /login', () => {
  beforeEach(done => {
    User.create(validUser).then(() => done())
  })

  afterEach(done => {
    User.deleteMany().then(() => done())
  })

  it('should return 401 response if incorrect password', done => {
    api.post('/api/login')
      .send({ ...validLogin, password: 'incorrectPassword' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return 401 response if incorrect email', done => {
    api.post('/api/login')
      .send({ ...validLogin, email: 'incorrectEmail' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 accepted response for correct login details', done => {
    api.post('/api/login')
      .send(validLogin)
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object if request is correct', done => {
    api.post('/api/login')
      .send(validLogin)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with a message and token keys if request is correct', done => { //testing the keys of that objects
    api.post('/api/login')
      .send(validLogin)
      .end((err, res) => {
        expect(res.body).to.contains.keys(['message', 'token'])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.post('/api/login')
      .send(validLogin)
      .end((err, res) => {
        expect(res.body.message).to.be.a('string')
        expect(res.body.token).to.be.a('string')
        done()
      })
  }) 
})
