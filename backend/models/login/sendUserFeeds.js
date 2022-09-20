const {standardizedResponse} = require("../../utils/fns");
const {queryResponseMessages} = require("../../common/variables");
const cc = console.log;

exports.sendUserFeeds = (req, res, feedResults, optionsResults) => {
    res.status(200).send(standardizedResponse(queryResponseMessages.success, {feeds: feedResults, options: optionsResults}));
}