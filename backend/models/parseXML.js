const {parser, standardizedResponse} = require("../utils/fns");

exports.parseXML = (req, res, feedResponse) => {
    let newResObject = structuredClone(res);

    let parsedResponse = parser.parse(feedResponse.data);
    newResObject.locals.entries = parsedResponse.rss.channel.item;
    newResObject.locals.feedTitle = parsedResponse.rss.channel.title;
    newResObject.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) newResObject.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    return newResObject;
}
