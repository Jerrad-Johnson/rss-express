const {doesUserExist} = require("../models/login/checkLogin");
const {errorExistsInScript} = require("../common/variables");
const {createUser} = require("../models/login/createUser");
const {confirmLoggedIn} = require("../models/login/confirmLoggedIn");
const cc = console.log;

exports.loginControllerPost = async (req, res) => {
    let queryResults;

    queryResults = await doesUserExist(req, res);
    if (queryResults?.error === errorExistsInScript) return;

    if (!queryResults.data?.[0]){
        queryResults = await createUser(req, res);
        if (queryResults?.error === errorExistsInScript) return;
    }

    queryResults = await doesUserExist(req, res);
    if (queryResults?.error === errorExistsInScript) return;

    // TODO add if check here
    confirmLoggedIn(req, res, queryResults);
}