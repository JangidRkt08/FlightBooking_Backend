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

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("cannot Fetch al the Airplanes",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        // if(!airplane){
        //     throw new AppError("Airplane not found",StatusCodes.NOT_FOUND)
        // }
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane not found",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Fetch the Airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirplane(id,data){

    try {
        const airplane = await airplaneRepository.update(id,data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane you requested to update not present",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Update the Airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function destroyAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane you requested to delete not present",StatusCodes.NOT_FOUND)
        }
        throw new AppError("cannot Destroy the Airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}