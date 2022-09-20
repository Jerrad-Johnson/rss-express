const {saveOptions} = require("../models/usrsettings/options");
const {errorExistsInScript} = require("../common/variables");
const {standardizedResponse} = require("../utils/fns");
const {saveFeeds} = require("../models/usrsettings/savefeeds");
const cc = console.log;

exports.saveFeedsControllerPost = (req, res) => {
    saveFeeds(req, res);
}