const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse , SuccessResponse} = require("../utils/common");


/**
 *
 * POSt : /cities
 * req-body : {name:'Delhi'}
 *
 */
async function createCity(req, res) {
    try {
     
      const city = await CityService.createCity({
       name:req.body.name
      });
      SuccessResponse.data = city
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error
      res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorResponse);
    }
  }

  module.exports={
    createCity
  }