const Cache = require('../models/Cache')
const axios = require('axios')

//  Example of how to use: 
/*
  caches.get('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete', { languagecode: 'en', text: 'rome' }, {
    headers: {
      'x-rapidapi-host': 'apidojo-booking-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  })
*/
async function get(base, params = {}, headers) {
  const url = `${base}?${Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')}`
  console.log(url)
  const cache = await Cache.findOne({ url }) || await axios.get(url, headers)
    .then(res => Cache.create({ url, data: JSON.stringify(res.data) }))
    .catch(err => console.log('err in lib/cache.js get():', err))

  return JSON.parse(cache.data)
}

module.exports = { get }