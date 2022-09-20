const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript, errorExistsNotInScript} = require("../../common/variables");
const cc = console.log;

exports.getUserOptions = async (req, res) => {
    let query = "SELECT columns_displayed, max_results_per_column FROM options WHERE user_id = ?";

    results = await genericSQLPromise(query, req.session.userid, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;
}