/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/User')

const samples = {
  valid: {
    username: 'validUsername',
    email: 'valid@email.com',
    password: 'testPassword',
    passwordConfirmation: 'testPassword'
  },
  duplicate: {
    username: 'test',
    email: 'test@test.test',
    password: 'test',
    passwordConfirmation: 'test'
  }
}

describe('POST /register', () => {
  // make a user to test against duplicate username/email
  beforeEach(done => { 
    User.create(samples.duplicate).then(() => done())
  })

  // emptying the db after the tests
  afterEach(done => { 
    User.deleteMany().then(() => done())
  })

  it('should return a 422 response if duplicate username', done => {
    api.post('/api/register')
      .send({ ...samples.valid, username: samples.duplicate.username })
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response if duplicate email', done => {
    api.post('/api/register')
      .send({ ...samples.valid, email: samples.duplicate.email })
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 422 response if password does not match passwordConfirmation', done => {
    api.post('/api/register')
      .send({ ...samples.valid, passwordConfirmation: 'notSamePassword' })
      .end((err, res) => {
        expect(res.status).to.eq(422)
        done()
      })
  })

  it('should return a 201 response if user is created successfully', done => {
    api.post('/api/register')
      .send(samples.valid)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object if request is correct', done => {
    api.post('/api/register')
      .send(samples.valid)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return an object with a message key if request is correct', done => {
    api.post('/api/register')
      .send(samples.valid)
      .end((err, res) => {
        expect(res.body).to.contains.keys(['message'])
        done()
      })
  })
})