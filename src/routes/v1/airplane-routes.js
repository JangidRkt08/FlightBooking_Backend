const express = require('express')
const {AirplaneService} = require('../../services')
const {AirplaneController} = require('../../controllers')
const router = express.Router();

// /api/v1/airplanes : POST
console.log("Inside airplane routes");
router.post('/',AirplaneController.createAirplane)

module.exports = router