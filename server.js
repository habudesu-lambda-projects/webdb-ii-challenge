const express = require('express')

const CarsRouter = require('./cars/carsRouter')

const server = express()

server.use(express.json())

server.use('/api/cars', CarsRouter)

server.get('/', (req, res) => {
  res.send('<h1>WebDB Challenge 2</h1>')
})

module.exports = server
