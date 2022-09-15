function standardizedResponse(status = 500, data = {}, message = {}){
    return {
        "status": status,
        "data": data,
        "message": message,
    }
}

exports.standardizedResponse = standardizedResponse;