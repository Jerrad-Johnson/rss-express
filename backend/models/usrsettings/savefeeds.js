const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript} = require("../../common/variables");
const {checkLogin, standardizedResponse} = require("../../utils/fns");
const cc = console.log;

exports.saveFeeds = async (req, res) => {
    let loggedIn = checkLogin(req, res);
    if (loggedIn !== true) return;

    if (req.body.length < 1) {
        res.status(200).send(standardizedResponse("No entries to store."));
        return;
    }

    let query = "DELETE FROM feeds WHERE user_id = ?";

    let deleteResult = genericSQLPromise(query, [req.session.userid], res);
    if (deleteResult.error === errorExistsInScript) return {error: errorExistsInScript};

    let thisQuery;

    for (let i = 0; i < req.body.length; i++) {
        thisQuery = "INSERT INTO feeds(user_id, feed_url) VALUES (?)";
        let queryResult = await genericSQLPromise(thisQuery, [[req.session.userid, req.body[i]]], res);
        if (queryResult.error === true) {
            res.status(500).send(standardizedResponse("Error"), queryResult.error);
            break;
        }
    }

    res.status(200).send(standardizedResponse());

}