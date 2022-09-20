const {genericSQLPromise} = require("../../common/queries");
const {errorExistsInScript} = require("../../common/variables");
const {checkLogin, standardizedResponse} = require("../../utils/fns");
const cc = console.log;

exports.saveFeeds = async (req, res) => {
    let loggedIn = checkLogin(req, res);
    if (loggedIn !== true) return;

    if (req.body.length < 1){
        res.status(200).send(standardizedResponse("No entries to store."));
        return;
    }

    let query = "DELETE FROM feeds WHERE user_id = ?";

    let deleteResult = genericSQLPromise(query, [req.session.userid], res);
    if (deleteResult.error === errorExistsInScript) return {error: errorExistsInScript};

    let promises = [];

    for (let i = 0; i < req.body.length; i++){
        let promise = genericSQLPromise("INSERT INTO feeds(user_id, feed_url) VALUES(?)", [req.session.userid, req.body[i]], res);
        promises.push(promise);
    }

    cc(promises);

/*    let insertResult = await Promise.all(() => {
        let queryLoop = "INSERT INTO feeds(user_id, feed_url) VALUES(?)";
        genericSQLPromise(queryLoop, [req.session.userid, req.body.feedurl], res);
    })*/


    /*results = await Promise.all(req.body.map((e) => {
        let queryLoop = "INSERT INTO feeds(user_id, feed_url) VALUES(?)";
        genericSQLPromise(query, [[req.session.userid, req.body.columnsPerRow, req.body.rssEntriesLimit], [req.body.columnsPerRow], [req.body.rssEntriesLimit]], res);
        if (results.error === errorExistsInScript) return {error: errorExistsInScript};

    }));*/












    /*for (let i = 0; i < req.body.length; i++){
        cc(i);
    }*/

        /*genericSQLPromise(query, [[req.session.userid, req.body.columnsPerRow, req.body.rssEntriesLimit], [req.body.columnsPerRow], [req.body.rssEntriesLimit]], res);
    if (results.error === errorExistsInScript) return {error: errorExistsInScript};

    res.status(200).send(standardizedResponse("Success"));*/

    //return results;
}