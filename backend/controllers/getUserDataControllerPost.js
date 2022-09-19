const {doesUserExist} = require("../models/login/checkLogin");
const {errorExistsInScript} = require("../common/variables");
const {createUser} = require("../models/login/createUser");
const {confirmLoggedIn} = require("../models/login/confirmLoggedIn");
const {getUserFeeds} = require("../models/login/getUserFeeds");
const cc = console.log;

exports.getUserDataControllerPost = async (req, res) => {
/*    let results;

    results = await getUserFeeds(req, res);
    if (results?.error === errorExistsInScript) return;
    cc(getUserFeeds())*/

/*
    if (!results.data?.[0]){
        results = await createUser(req, res);
        if (results.error === errorExistsInScript) return;
    }
*/

    //confirmLoggedIn(req, res);
}

