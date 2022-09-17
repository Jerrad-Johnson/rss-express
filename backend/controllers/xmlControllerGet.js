const {getXML} = require("../models/getXML");
const {parseXML} = require("../models/parseXML");
const cc = console.log;


exports.xmlControllerGet = async (req, res) => {
    let feedResponse = await getXML(req, res);
    parseXML(req, res, feedResponse);
}