const {errorExistsNotInScript, errorExistsInScript} = require("./variables");
const {genericError} = require("../utils/fns");
const {pool} = require("./pool");

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