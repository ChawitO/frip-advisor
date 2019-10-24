const Cache = require('../models/Cache')
const axios = require('axios')

//  Example of how to use: 
/*
  caches.get('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete', { languagecode: 'en', text: 'rome' }, {
    headers: {
      'x-rapidapi-host': 'apidojo-booking-v1.p.rapidapi.com',
      'x-rapidapi-key': 'cb1d6a3714msh519f41c1aaaffd1p123cdejsn07df305ea89a'
    }
  })
*/
async function get(base, params = {}, headers) {
  const url = `${base}?${Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')}`

  const cache = await Cache.findOne({ url }) || await axios.get(url, headers)
    .then(res => Cache.create({ url, data: JSON.stringify(res.data) }))
    .catch(err => console.log('err in lib/cache.js:', err))

  return JSON.parse(cache.data)
}

module.exports = { get }