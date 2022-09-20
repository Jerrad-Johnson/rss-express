const {saveOptions} = require("../models/usrsettings/options");
const cc = console.log;

exports.optionsControllerPost = (req, res) => {
    saveOptions(req, res)
}