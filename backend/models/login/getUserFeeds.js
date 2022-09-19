const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript, errorExistsNotInScript} = require("../../common/variables");
const cc = console.log;

exports.getUserFeeds = async (req, res) => {
    let didError = errorExistsNotInScript;
    let query = 'SELECT * FROM feeds WHERE user_id = ?';

    cc(req?.session)

    /*results = await genericSQLPromise(query, req.session.userid, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;*/
}