const {parser} = require("../../utils/fns");
const cc = console.log;

exports.parseXML = (req, res, feedResponse) => {
    //cc(feedResponse)
    //TODO Add check for XML-type data.
    if (!feedResponse?.data) return;
    let parsedResponse = parser.parse(feedResponse.data);
    if (parsedResponse?.rss?.channel?.item) res.locals.entries = parsedResponse.rss.channel.item;
    if (parsedResponse?.rss?.channel?.title) res.locals.feedTitle = parsedResponse.rss.channel.title;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;
    res.locals.feedLink = req.body.feedURL;
    return res;
}
