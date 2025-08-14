const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse , SuccessResponse} = require("../utils/common");
const e = require("express");

/**
 *
 * POSt : /airplane
 * req-body : {modelNumber:'airbus230',capacity:100}
 *
 */
async function createAirplane(req, res) {
  try {
   
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
