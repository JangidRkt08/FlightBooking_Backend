const Crudrepository = require("./crud-repository");
const { City } = require("../models");

class CityRepository extends Crudrepository {
    constructor() {
        super(City);
    }
}
module.exports = CityRepository;