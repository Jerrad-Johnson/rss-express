const express = require('express');
const router = express.Router();
const axios = require("axios");
const httpClient = axios.create();
const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const cors = require('cors');
const {standardizedResponse, genericError} = require("../utils/fns");
const cc = console.log;

httpClient.defaults.timeout = 8000;

router.use(cors({
    origin: "http://localhost:3000",
}));

router.post('/getXML', async (req, res, next) => {
    let feedResponse = {};

    try{
        await httpClient.get(req.body.feedURL).then((axiosResponse) => {
            feedResponse = axiosResponse;
        });
    } catch (error) {
        return genericError(res, "", error);
    }

    if (!feedResponse?.data){
        return genericError(res, "Remote server did not return any data.")
    }

    let parsedResponse = parser.parse(feedResponse.data);
    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(standardizedResponse("", res.locals));
});

module.exports = router;

