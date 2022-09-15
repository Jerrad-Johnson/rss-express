function standardizedResponse(message = "Failed to load", data = {}){
    return {
        "message": message,
        "data": data,
    }
}

exports.standardizedResponse = standardizedResponse;