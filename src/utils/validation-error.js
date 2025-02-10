const AppError = require('./error-handler')
const {StatusCodes} = require('http-status-codes')

class ValidationError extends AppError {
    constructor(error){
        let explanation =[];
        let errorName
        error.errors.forEach(err => {
            explanation.push(err.message)
        });
        super(
            errorName = error.name,
            'Not able to validate the data sent in the request',
            StatusCodes.BAD_REQUEST,
            explanation
        )
    }
}

module.exports = ValidationError