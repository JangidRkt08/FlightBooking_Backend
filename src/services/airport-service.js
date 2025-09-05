const { StatusCodes } = require("http-status-codes");
const {AirportRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        // console.log("Inside services");
        const airport = await airportRepository.create(data);
        return airport
    } catch (error) {
       if(error.name == "SequelizeValidationError"){
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })
        
        throw new AppError("cannot Create a new Airport Object",StatusCodes.INTERNAL_SERVER_ERROR)
       }
        throw error
    }
}

async function getAirports(){
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError("cannot Fetch all the Airports",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        // if(!airport){
        //     throw new AppError("Airplane not found",StatusCodes.NOT_FOUND)
        // }
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport not found",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Fetch the Airport",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id,data){

    try {
        const airport = await airportRepository.update(id,data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport you requested to update not present",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Update the Airport",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport you requested to delete not present",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Destroy the Airport",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    destroyAirport
}