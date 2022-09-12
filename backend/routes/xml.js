const express = require('express');
const router = express.Router();
const axios = require("axios");
const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
/*const bodyParser = require('body-parser');*/
const parser = new XMLParser();
const cc = console.log;

/*router.use(bodyParser.urlencoded({ extended: true }));*/

router.post('/getXML', async (req, res, next) => {
    cc(req.body)
    /*let feedResponse = await getXMLData(url);
    let parsedResponse = parser.parse(feedResponse.data);

    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = parsedResponse.rss.channel.link;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(res.locals);*/
})

async function getXMLData(url){
    let results = await axios.get(url);

    return results;
}

module.exports = router;
















//res.locals.fullXMLResponse = parsedResponse;
/*    let listOfTitles = [];

    for (let i = 0; i < res.locals.entries.length; i++){
        listOfTitles.push(res.locals.entries[i].title)
    }*/


