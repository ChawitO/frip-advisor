const Cache = require('../lib/cache')

const headers = { headers: { 'user-key': process.env.ZOMATO_TOKEN } }

function searchRestaurants(req, res) {
  Cache.get('https://developers.zomato.com/api/v2.1/search', { ...req.query, ...req.params }, headers)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'page not found', ...err }))
}

module.exports = { searchRestaurants }