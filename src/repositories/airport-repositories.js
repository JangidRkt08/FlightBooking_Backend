const Crudrepository = require("./crud-repository");
const { Airport } = require("../models");
class   AirportRepository extends Crudrepository {
    constructor() {
        super(Airport);
    }
}
module.exports = AirportRepository;