const cc = console.log;

function standardizedResponse(message = "", data = {}){
    return {
        "data": data,
        "message": message,
    }
}

function genericError(res, message = "", data = {}, customStatus = 500){
    res.status(customStatus).send({
        "data": data,
        "message": message,
    });
}

exports.standardizedResponse = standardizedResponse;
exports.genericError = genericError;
