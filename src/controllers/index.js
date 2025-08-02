const { AirplaneRepository } = require("../repositories");
const { createAirplane } = require("./airplane-controller");
const { info } = require("./info-controller");

module.exports={
    InfoController:info,
    AirplaneController:require('./airplane-controller')
}