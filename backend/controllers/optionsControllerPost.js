const {saveOptions} = require("../models/usrsettings/options");
const {errorExistsInScript} = require("../common/variables");
const {standardizedResponse} = require("../utils/fns");
const cc = console.log;

exports.optionsControllerPost = (req, res) => {
    saveOptions(req, res);
}