const {doesUserExist} = require("../models/login/checkLogin");
const {errorExistsInScript} = require("../common/variables");
const {createUser} = require("../models/login/createUser");
const {confirmLoggedIn} = require("../models/login/confirmLoggedIn");
const cc = console.log;

exports.loginControllerPost = async (req, res) => {
    let results;

    results = await doesUserExist(req, res);
    if (results.error === errorExistsInScript) return;

    if (!results.data?.[0]){
        results = await createUser(req, res);
        if (results.error === errorExistsInScript) return;
    }

    confirmLoggedIn(req, res);
}