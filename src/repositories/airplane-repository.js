const Crudrepository = require("./crud-repository");
const { Airplane } = require("../models");
class AirplaneRepository extends Crudrepository {
    constructor() {
        super(Airplane);
    }
}
module.exports = AirplaneRepository;