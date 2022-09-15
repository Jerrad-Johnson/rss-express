const express = require('express');
const router = express.Router();
const axios = require("axios");
const {XMLParser} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
const cc = console.log;
const cors = require('cors');
const commonFns = require("../utils/fns");
const {standardizedResponse} = require("../utils/fns");

router.use(cors({
    origin: "http://localhost:3000",
}));

router.post('/getXML', async (req, res, next) => {
    let errorMessage = false;
    let feedResponse = {};

    await axios.get(req.body.feedURL).then((axiosResponse) => {
        feedResponse = axiosResponse;
    }).catch((axiosError) => {
        if (axiosError.response){
            errorMessage = axiosError.response.status;
        } else if (axiosError.request){
            errorMessage = axiosError.request;
        }
    });

    if (errorMessage !== false){
        res.send(standardizedResponse("!OK", errorMessage));
        return;
    }

    let parsedResponse = parser.parse(feedResponse.data);

    res.locals.entries = parsedResponse.rss.channel.item;
    res.locals.feedTitle = parsedResponse.rss.channel.title;
    res.locals.feedLink = req.body.feedURL;
    if (parsedResponse?.rss?.channel?.lastBuildDate) res.locals.lastUpdated = parsedResponse.rss.channel.lastBuildDate;

    res.send(commonFns.standardizedResponse("OK", res.locals));
});

module.exports = router;

