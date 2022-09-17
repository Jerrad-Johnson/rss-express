const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const express = require('express');
const router = express.Router();

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
exports.parser = parser;
exports.router = router;
