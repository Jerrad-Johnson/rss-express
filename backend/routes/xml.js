const express = require('express');
const router = express.Router();
const axios = require("axios");
const httpClient = axios.create();
const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const cors = require('cors');
const {standardizedResponse} = require("../utils/fns");
const cc = console.log;

httpClient.defaults.timeout = 100;

router.use(cors({
    origin: "http://localhost:3000",
}));

router.post('/getXML', async (req, res, next) => {
    let errorMessage = false;
    let feedResponse = {};

    await httpClient.get(req.body.feedURL).then((axiosResponse) => {
        feedResponse = axiosResponse;
    }).catch((axiosError) => {
        errorMessage = true;
        res.status(500);
        res.send();
    });

    if (errorMessage === true) return;

    if (!feedResponse?.data){
        res.send({status: 500});
        return;
    }

    let parsedResponse = parser.parse(feedResponse.data);

    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(standardizedResponse(200, res.locals));
});



// FOR TESTING

/*
router.get('/getXML', async (req, res, next) => {
    let errorMessage = false;
    let feedResponse = {};

    await axios.get("http://feeds.feedbdwaurner.com/SlickdealsnetFP?format=xml").then((axiosResponse) => {
        feedResponse = axiosResponse;
    }).catch((axiosError) => {
        errorMessage = true;
        res.send({status: 500, message: axiosError});
    });

    if (errorMessage === true) return;

    res.send(errorMessage);

    if (errorMessage !== false){
        res.send(standardizedResponse("!OK", errorMessage));
        return;
    }

    let parsedResponse = parser.parse(feedResponse.data);

    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(standardizedResponse("OK", res.locals));
});
*/

module.exports = router;

