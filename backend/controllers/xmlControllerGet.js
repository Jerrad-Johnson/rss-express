const {getXML} = require("../models/getXML");
const {parseXML} = require("../models/parseXML");
const {standardizedResponse} = require("../utils/fns");
const cc = console.log;

exports.xmlControllerGet = async (req, res) => {
    let feedResponse = await getXML(req, res);
    let newResObject = parseXML(req, res, feedResponse);
    newResObject.send(standardizedResponse("", newResObject.locals));
}