const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript, errorExistsNotInScript} = require("../../common/variables");
const cc = console.log;

exports.createUser = async (req, res) => {
    let didError = errorExistsNotInScript;
    let query = 'INSERT INTO users(email) VALUES (?)';

    results = await genericSQLPromise(query, req.body.email, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;
}
