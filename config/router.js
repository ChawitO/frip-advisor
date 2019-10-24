const router = require('express').Router()

const users = require('../controllers/auth')
const caches = require('../lib/cache')
const axios = require('axios')

router.route('/register')
  .post(users.register)

router.route('/testCache')
  .get(function(req, res) {
    caches.get('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete', { languagecode: 'en', text: 'rome' })
      .then(info => {
        console.log('should be last:', info)
        res.status(200).json(info)
      })
      .catch(err => res.status(404).json(err))
  })

module.exports = router