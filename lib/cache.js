const Cache = require('../models/Cache')
const axios = require('axios')

async function get(base, params = {}) {
  const option = Object.entries(params).map(item => `${item[0]}=${item[1]}`).join('&')
  const url = `${base}?${option}`

  const result = Cache.findOne({ url })
    .then(cache => {
      if (cache) return JSON.parse(cache.data)

      return axios
        .get(url, {
          headers: {
            'x-rapidapi-host': 'apidojo-booking-v1.p.rapidapi.com',
            'x-rapidapi-key': 'cb1d6a3714msh519f41c1aaaffd1p123cdejsn07df305ea89a'
          }
        })
        .then(res => {
          console.log('then after axios')
          // const obj = { url, data: JSON.stringify(res.data) }

          // Cache.create({ url, data: JSON.stringify(res.data) })
          // return res.data

          return Cache.create({ url, data: JSON.stringify(res.data) })
            .then(cache => JSON.parse(cache.data))
        })
        .catch(err => console.log('err in lib/cache.js', err))
    })
  
  console.log('line31:', result)
  console.log('line32:', await result)
  return await result
}

module.exports = { get }