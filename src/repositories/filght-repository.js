const Crudrepository = require("./crud-repository");
const { Flight } = require("../models");
const { or } = require("sequelize");
class  FlightRepository extends Crudrepository {
    constructor() {
        super(Flight);
    }
    async getAllFlights(filter, sort){
        
        const response = await Flight.findAll({
            attributes: { exclude: ['code'] },
            where: filter,order: sort
        });
        return response;
    }
}
module.exports = FlightRepository;