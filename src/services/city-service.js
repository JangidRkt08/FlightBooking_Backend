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

module.exports = { createCity }