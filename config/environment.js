const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/frip-advisor${process.env.NODE_ENV || 'dev'}`
const secret = process.env.SECRET || 'le secret token'

module.exports = { dbURI, port, secret }
