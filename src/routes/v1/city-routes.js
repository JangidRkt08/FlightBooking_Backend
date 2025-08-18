const express = require('express')
const {AirplaneService} = require('../../services')
const {CityController} = require('../../controllers')
const router = express.Router();
const {AirplaneMiddlewares} = require('../../middlewares')

// /api/v1/airplanes : POST
router.post('/',
    CityController.createCity)


module.exports = router