const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript, errorExistsNotInScript} = require("../../common/variables");
const cc = console.log;

exports.getUserFeeds = async (req, res) => {
    let query = "SELECT feed_url FROM feeds WHERE user_id = ? ORDER BY id ASC";

    results = await genericSQLPromise(query, req.session.userid, res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    return results;
}