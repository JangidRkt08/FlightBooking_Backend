const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        // console.log("Inside services");
        const airplane = await airplaneRepository.create(data);
        return airplane
    } catch (error) {
       if(error.name == "SequelizeValidationError"){
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })
        
        throw new AppError("cannot Create a new Airplane Object",StatusCodes.INTERNAL_SERVER_ERROR)
       }
        throw error
    }
}

module.exports = {
    createAirplane
}