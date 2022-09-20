const {doesUserExist} = require("../models/login/checkLogin");
const {errorExistsInScript} = require("../common/variables");
const {createUser} = require("../models/login/createUser");
const {confirmLoggedIn} = require("../models/login/confirmLoggedIn");
const {getUserFeeds} = require("../models/login/getUserFeeds");
const {standardizedResponse} = require("../utils/fns");
const {sendUserFeeds} = require("../models/login/sendUserFeeds");
const {getUserOptions} = require("../models/login/getUserOptions");
const cc = console.log;

exports.getUserDataControllerPost = async (req, res) => {
    if (!req.session.isLoggedIn){
        res.status(500).send(standardizedResponse("Not logged in."));
    }

    let feedResults = await getUserFeeds(req, res);
    if (feedResults?.error === errorExistsInScript) return;

    let optionsResults = await getUserOptions(req, res);
    if (optionsResults?.error === errorExistsInScript) return;

    sendUserFeeds(req, res, feedResults, optionsResults);
}

