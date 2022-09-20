const {parser} = require("../../utils/fns");

exports.parseXML = (req, res, feedResponse) => {
    let parsedResponse = parser.parse(feedResponse.data);
    if (parsedResponse?.rss?.channel?.item) res.locals.entries = parsedResponse.rss.channel.item;
    if (parsedResponse?.rss?.channel?.title) res.locals.feedTitle = parsedResponse.rss.channel.title;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;
    res.locals.feedLink = req.body.feedURL;
    return res;
}
