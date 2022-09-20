const {parser} = require("../../utils/fns");
const cc = console.log;

exports.parseXML = (req, res, feedResponse) => {
    //TODO Add check for XML-type data.
    if (feedResponse.data.charAt(0) !== "<") return; // This is a lame fix for eliminating non-XML data from being processed below, which will crash the server.
    let parsedResponse = parser.parse(feedResponse.data);
    if (parsedResponse?.rss?.channel?.item) res.locals.entries = parsedResponse.rss.channel.item;
    if (parsedResponse?.rss?.channel?.title) res.locals.feedTitle = parsedResponse.rss.channel.title;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;
    res.locals.feedLink = req.body.feedURL;
    return res;
}
