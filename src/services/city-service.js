const { StatusCodes } = require("http-status-codes");
const {CityRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const cityRepository = new CityRepository();

async function createCity(data){
    try {
        // console.log("Inside services");
        const city = await cityRepository.create(data);
        return city
    } catch (error) {
        console.log(error);
        
        if(error.name == "SequelizeUniqueConstraintError" ||error.name == "SequelizeValidationError" )
        {
        let explanation = [];
        error.errors.forEach((err) => {
            
            explanation.push(err.message)
        })
        
        throw new AppError(explanation,StatusCodes.BAD_REQUEST)
       }
        throw AppError("cannot Create a new City Object",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "cannot Fetch all the Cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "cannot Fetch the City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "City you requested to update not present",
        StatusCodes.NOT_FOUND
      );
    }
    if (
      error.name == "SequelizeUniqueConstraintError" ||
      error.name == "SequelizeValidationError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "cannot Update the City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "City you requested to delete not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "cannot Destroy the City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  destroyCity,
};