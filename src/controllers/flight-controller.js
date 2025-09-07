const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const e = require("express");

/**
 *
 * POST : /flights
 * req-body : {
 *  flightNumber:'IGI-123',
 *  airplaneId:1,
 *  departureAirportId:1,
 *  arrivalAirportId:2,
 *  arrivalTime:'2021-01-01T12:00:00.000Z',
 *  departureTime:'2021-01-01T12:00:00.000Z',
 *  price:1000,
 *  boardingGate:'A',
 *  totalSeats:100
 * 
 * }
 *
 */
async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    
    
    const flights = await FlightService.getAllFlights(req.query);
    
    SuccessResponse.data = flights;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
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

module.exports = {
  createFlight,
  getAllFlights
};
