const { StatusCodes } = require("http-status-codes");
const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");
const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        // console.log("Inside services");
        const flight = await flightRepository.create(data);
        return flight
    } catch (error) {
       if(error.name == "SequelizeValidationError"){
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })
        
        throw new AppError("cannot Create a new Flight Object",StatusCodes.INTERNAL_SERVER_ERROR)
       }
        throw error
    }
}

async function getAllFlights(query){
    let customFilter= {};
    let sortFilter = [];
    const endingTripTime = " 23:59:59";
    if(query.trips){
        console.log(query.trips);
        
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
           customFilter.departureAirportId = departureAirportId,
           customFilter.arrivalAirportId = arrivalAirportId
        //    todo : ADD CHECK THEY ARE NOT SAME
        
    }  
    
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]:[ minPrice,(maxPrice== undefined)?30000:maxPrice],
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
 
        customFilter.departureTime = {
            [Op.between]:[query.tripDate,query.tripDate+ endingTripTime]
        }

    }
    if(query.sort){
        let params=query.sort.split(",");
        const sortFilters = params.map((params)=>params.split("_"));
        sortFilter = sortFilters
    }
    try {
        // console.log("Inside services");
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        
        return flights
    } catch (error) {
       if(error.name == "SequelizeValidationError"){
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message)
        })
        
        throw new AppError("cannot FETCH DATA OF ALL THE FLIGHTS",StatusCodes.INTERNAL_SERVER_ERROR)
       }
        throw error
    }
}



module.exports = {
    createFlight,
    getAllFlights
   
}