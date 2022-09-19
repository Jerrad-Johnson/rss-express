const {errorExistsInScript, errorExistsNotInScript} = require("../../common/variables");
const {genericSQLPromise} = require("../../common/queries");
const cc = console.log;

exports.doesUserExist = async (req, res) => {
    let didError = errorExistsNotInScript;
    let query = 'SELECT email, id FROM users WHERE email = ?';

    results = await genericSQLPromise(query, req.body.email, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;
}
