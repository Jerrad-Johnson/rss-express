const {getXML} = require("../models/getXML");
const {parseXML} = require("../models/parseXML");
const {standardizedResponse} = require("../utils/fns");
const cc = console.log;

exports.xmlControllerGet = async (req, res) => {
    let feedResponse = await getXML(req, res);
    if (!feedResponse?.data) return;
    parseXML(req, res, feedResponse);
    res.send(standardizedResponse("", res.locals));

    /*if (feedResponse?.data){
        parseXML(req, res, feedResponse);
        res.send(standardizedResponse("", res.locals));
    }*/
}