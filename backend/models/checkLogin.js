const {pool} = require("../common/pool");
const {genericError, genericSQLErrorCheck, genericSQLPromise} = require("../utils/fns");
const {errorExistsInScript, errorExistsNotInScript} = require("../common/variables");
const cc = console.log;

exports.doesUserExist = async (req, res, email) => {
    let didError = errorExistsNotInScript;
    let query = 'SELECT email FROM users WHERE email = ?';

    results = await genericSQLPromise(query, email, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;

    /*query = 'INSERT INTO users(email) VALUES (?)';
    didError = await genericSQLPromise(query, email, res);
    if (didError) return errorExistsInScript;*/


}
