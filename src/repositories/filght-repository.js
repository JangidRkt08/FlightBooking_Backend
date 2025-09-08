const Crudrepository = require("./crud-repository");
const { Flight,Airplane,Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
class  FlightRepository extends Crudrepository {
    constructor() {
        super(Flight);
    }
    async getAllFlights(filter, sort){
        
        const response = await Flight.findAll({
            // attributes: { exclude: ['code'] },
            where: filter,
            order: sort,
            // -----> JOIN Eager Loading in Sequelize  <-----
            // Include helps in fetching data from another table or model(JOIN or eager loading)
            include:[
                {
               model: Airplane,
               required: true,
               as: "airplaneDetail",
            },
            {
                model : Airport,
                required: true,
                as: "departureAirport",
                on :{
                    col1:Sequelize.where(Sequelize.col('Flight.departureAirportId'), "=",Sequelize.col('departureAirport.code')),
                    // col2:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),Sequelize.col('Airports.code'))
                },
                include:{
                    model : City,
                    required:true,
                }
            },
             {
                model : Airport,
                required: true,
                as: "arrivalAirport",
                on :{
                    col1:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), "=",Sequelize.col('arrivalAirport.code')),
                    // col2:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),Sequelize.col('Airports.code'))
                },
                include:{
                    model : City,
                    required:true,
                }
            }
        ]
        });
        return response;
    }
}
module.exports = FlightRepository;