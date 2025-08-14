const { StatusCodes } = require("http-status-codes");

const {ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber){
        ErrorResponse.message = "modelNumber is required"
        ErrorResponse.error = new AppError(["modelNumber is not found in incoming request in the correct Form"],StatusCodes.BAD_REQUEST)

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next();
}

module.exports={
    validateCreateRequest
}