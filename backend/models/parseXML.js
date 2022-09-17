const {parser, standardizedResponse} = require("../utils/fns");

exports.parseXML = (req, res, feedResponse) => {
    let parsedResponse = parser.parse(feedResponse.data);
    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(standardizedResponse("", res.locals));
}
