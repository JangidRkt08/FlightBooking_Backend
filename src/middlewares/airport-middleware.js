const { StatusCodes } = require("http-status-codes");

const {ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating Airport"
        ErrorResponse.error = new AppError(["Name is not found in incoming request in the correct Form"],StatusCodes.BAD_REQUEST)

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
     if(!req.body.code){
        ErrorResponse.message = "Something went wrong while creating Airport"
        ErrorResponse.error = new AppError(["code is not found in incoming request in the correct Form"],StatusCodes.BAD_REQUEST)

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
     if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating Airport"
        ErrorResponse.error = new AppError(["cityId is not found in incoming request in the correct Form"],StatusCodes.BAD_REQUEST)

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next();
}

module.exports={
    validateCreateRequest
}