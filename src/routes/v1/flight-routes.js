const express = require('express')
// const {AirportService} = require('../../services')
const {FlightController} = require('../../controllers')
const router = express.Router();
const {FlightMiddlewares} = require('../../middlewares')

// /api/v1/airports : POST
router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight)


// // /api/v1/flights?trips=MUM-DEL : GET    
router.get('/',
    FlightController.getAllFlights)

// // /api/v1/airports/:id : GET
router.get('/:id',
    FlightController.getFlight)

// // /api/v1/airports/:id : DELETE
// router.delete('/:id',
//     FlightController.destroyAirport)

// // /api/v1/airports/:id : PUT
// router.put('/:id',
//     FlightController.updateAirport)

module.exports = router