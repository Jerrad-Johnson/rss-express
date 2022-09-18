const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const express = require('express');
const {pool} = require("../common/pool");
const {errorExistsInScript, errorExistsNotInScript} = require("../common/variables");
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

function genericSQLErrorCheck(res, err){
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

exports.standardizedResponse = standardizedResponse;
exports.genericError = genericError;
exports.genericSQLErrorCheck = genericSQLErrorCheck;
exports.parser = parser;
exports.router = router;
