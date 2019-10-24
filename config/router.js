const router = require('express').Router()

const users = require('../controllers/auth')

router.route('/register')
  .post(users.register)

module.exports = router