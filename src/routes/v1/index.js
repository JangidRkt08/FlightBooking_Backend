const express = require('express')
const {InfoController} = require('../../controllers')
const router = express.Router()
const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-routes')
const airportRoutes = require('./airport-routes')
const flightRoutes = require('./flight-routes')

// console.log("Inside v1 routes");

router.use('/airplanes', airplaneRoutes)
router.use('/cities', cityRoutes)
router.get('/info', InfoController)
router.use('/airports', airportRoutes)
router.use('/flights',flightRoutes)

module.exports = router