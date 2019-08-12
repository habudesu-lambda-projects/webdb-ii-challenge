const express = require('express')
const knex = require('knex')

const db = require('../data/db-config.js')

const router = express.Router()

router.get('/', async ( req, res ) => {
  try {
    const cars = await db('cars')
    res.status(200).json(cars)
  }
  catch(error) {
    res.status(500).json({ message: "Could Not Get Cars", error: error })
  }
})

router.post('/', validateCar, async ( req, res ) => {
  try {
    const car = await db('cars').insert(req.car)
    res.status(201).json({ message: "Successfully Added Car", addedCar: req.car})
  }
  catch(error) {
    res.status(500).json({ message: "Could Not Add Car", error: error })
  }
})

//validation middleware

function validateCar( req, res, next ) {
  const body = req.body
  if(!body.VIN) {
    res.status(400).json({ message: "VIN is Required" })
  } else if(!body.make) {
    res.status(400).json({ message: "Make is Required" })
  } else if(!body.model) {
    res.status(400).json({ message: "Model is Required" })
  } else if(!body.mileage) {
    res.status(400).json({ message: "Mileage is Required" })
  } else {
    req.car = body
    next()
  }
}

module.exports = router;
