const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const express = require('express');
const cc = console.log;

exports.router = express.Router();

exports.standardizedResponse = (message = "", data = {}) => {
    return {
        "data": data,
        "message": message,
    }
}

exports.genericError = (res, message = "", data = {}, customStatus = 500) => {
    res.status(customStatus).send({
        "data": data,
        "message": message,
    });
}

exports.genericSQLErrorCheck = (res, err) => {
    if (err !== null){
        genericError(res, err.sqlMessage);
        return true;
    }
    return false;
}

exports.parser = parser;
