require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./config/router')
const { dbURI, port } = require('./config/environment')

const logger = require('./lib/logger')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(`Express connected to port ${port}`)
)

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use('/api', logger)

app.use('/api', router)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
// app.get('/*', (req, res) => res.status(404).json({ message: 'page not found' }))

app.listen(port, () => console.log(`Running on port ${port}`))

module.exports = app
