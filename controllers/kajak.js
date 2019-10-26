const Cache = require('../lib/cache')

const headers = {
  headers: {
    'x-rapidapi-host': 'apidojo-kayak-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
}

function flightIndex(req, res) {
  Cache.get('https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session', { ...req.query, ...req.params }, headers)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'page not found', ...err }))
}

module.exports = { flightIndex }
