const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

/**
 *
 * POSt : /airplane
 * req-body : {modelNumber:'airbus230',capacity:100}
 *
 */
async function createAirplane(req, res) {
  try {
    // console.log(req.body);
    console.log("Inside controller");
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Airplane created successfully",
      data: airplane,
      error: {},
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        message: "Something went wrong While creating Airplane",
        data: {},
        error: error,
      });
  }
}

module.exports = {
  createAirplane,
};
