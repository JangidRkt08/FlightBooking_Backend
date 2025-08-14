const express = require('express')
const {AirplaneService} = require('../../services')
const {AirplaneController} = require('../../controllers')
const router = express.Router();
const {AirplaneMiddlewares} = require('../../middlewares')

// /api/v1/airplanes : POST
// console.log("Inside airplane routes");
router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane)

module.exports = router