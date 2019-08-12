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

router.put('/:id', validateCarId, async ( req, res) => {
  const {id} = req.params
  try {
    const update = await db('cars').where({id}).update(req.body)
    const updatedCar = await db('cars').where({id})
    res.status(201).json({ message: "Successfully Updated Car", updatedCar: updatedCar})
  }
  catch(error) {
    res.status(500).json({ message: "Could Not Update Car", error: error })
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

async function validateCarId( req, res, next ) {
  const {id} = req.params
  try {
    const car = await db('cars').where({id})
    if(car.length) {
      next()
    } else {
      res.status(404).json({ message: `Could Not Find Car with ID ${id}`})
    }
  }
  catch(error) {
    res.status(500).json({ message: "Error with validateCarId", error: error })
  }
}

module.exports = router;
