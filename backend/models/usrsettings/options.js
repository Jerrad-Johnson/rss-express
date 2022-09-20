const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript} = require("../../common/variables");
const cc = console.log;

exports.saveOptions = async (req, res) => {

    cc(req.session)

    let query = "INSERT INTO options(user_id, columns_displayed, max_results_per_column) VALUES(?) ON DUPLICATE KEY UPDATE columns_displayed = ?, max_results_per_column = ?";

    cc([req.session.userid, req.body.columnsPerRow, req.body.rssEntriesLimit])

    results = await genericSQLPromise(query, [[req.session.userid, req.body.columnsPerRow, req.body.rssEntriesLimit], [req.body.columnsPerRow], [req.body.rssEntriesLimit]], res);
    if (results.error === errorExistsInScript) return errorExistsInScript;

    cc(results);

    return results;
}