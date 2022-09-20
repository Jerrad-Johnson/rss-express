const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript} = require("../../common/variables");
const {checkLogin, standardizedResponse} = require("../../utils/fns");
const cc = console.log;

exports.saveOptions = async (req, res) => {
    let loggedIn = checkLogin(req, res);
    if (loggedIn !== true) return;

    let query = "INSERT INTO options(user_id, columns_displayed, max_results_per_column) VALUES(?) ON DUPLICATE KEY UPDATE columns_displayed = ?, max_results_per_column = ?";

    results = await genericSQLPromise(query, [[req.session.userid, req.body.columnsPerRow, req.body.rssEntriesLimit], [req.body.columnsPerRow], [req.body.rssEntriesLimit]], res);
    if (results.error === errorExistsInScript) return {error: errorExistsInScript};

    res.status(200).send(standardizedResponse("Success"));

    return results;
}