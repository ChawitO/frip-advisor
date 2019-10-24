const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost/frip-advisor-${env}`
const port = 4000
const secret = 'le secret token'

module.exports = { dbURI, port, secret }