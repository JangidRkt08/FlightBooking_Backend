const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse , SuccessResponse} = require("../utils/common");
const e = require("express");

/**
 *
 * POSt : /airport
 * req-body : {name:'IGI',cityId:5,address:'delhi',code:'DEL'}
 *
 */
async function createAirport(req, res) {
  try {
   
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId
    });
    SuccessResponse.data = airport
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

/**
 *
 * GET : /airports
 * req-body : {}
 *
 */

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

/**
 *
 * GET : /airports/:id
 * req-body : {}
 *
 */

async function getAirport(req, res) {

  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}


/**
 *
 * DELETE : /airport/:id
 * req-body : {}
 *
 */
async function destroyAirport(req, res) {

  try {
    const response = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

/**
 *
 * PUT : /airport/:id
 * req-body : {}
 *
 */
async function updateAirport(req, res) {

  try {
    const response = await AirportService.updateAirport(req.params.id, req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  updateAirport,
  destroyAirport
};
