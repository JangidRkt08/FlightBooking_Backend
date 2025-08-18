const express = require('express')
const {AirplaneService} = require('../../services')
const {CityController} = require('../../controllers')
const router = express.Router();
const {AirplaneMiddlewares, CityMiddlewares} = require('../../middlewares')

// /api/v1/cities : POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity)

// /api/v1/cities : GET    
router.get('/',
    CityController.getCities)

// /api/v1/cities/:id : GET
router.get('/:id',
    CityController.getCity)

// /api/v1/cities/:id : DELETE
router.delete('/:id',
    CityController.destroyCity)

// /api/v1/cities/:id : PUT
router.put('/:id',
    CityMiddlewares.validateUpdateRequest,
    CityController.updateCity)

module.exports = router