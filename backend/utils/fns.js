function standardizedResponse(message = "!OK", data = {}){
    return {
        "message": message,
        "data": data,
    }
}

exports.standardizedResponse = standardizedResponse;