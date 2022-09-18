const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const express = require('express');
const {pool} = require("../common/pool");
const {errorExistsInScript, errorExistsNotInScript} = require("../common/variables");
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

exports.genericSQLPromise = async (query, values, res) => {
    let didError = errorExistsNotInScript;
    let queryResults;

    await new Promise ((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                didError = errorExistsInScript;
                genericError(res, err.sqlMessage);
                reject(err.sqlMessage);
            }
            queryResults = results;
            resolve();
        });
    }).catch((e) => {
        cc(e)
    });

    return {error: didError, data: queryResults};
}

exports.parser = parser;
