const express = require('express')
const {InfoController} = require('../../controllers')

const router = express.Router()

const airplaneRoutes = require('./airplane-routes')

console.log("Inside v1 routes");

router.use('/airplanes', airplaneRoutes)
router.get('/info', InfoController)

module.exports = router