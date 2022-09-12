var express = require('express');
const axios = require("axios");
var router = express.Router();
const { XMLParser, XMLBuilder, XMLValidator} = require("../node_modules/fast-xml-parser/src/fxp");
const parser = new XMLParser();
let cc = console.log;

router.use('/getXML', async (req, res, next) => {
    let data = await getXMLData();
    cc(data)
    res.locals.xml = parser.parse(data);
    next();
})

router.get('/getXML', (req, res) => {
    res.send(res.locals.xml);
});

async function getXMLData(url = `https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1`){
    let results = await axios({
            method: 'GET',
            "url": url,
            headers: {
                'Content-Type': 'text/xml'
            }
        },
    );

    return results;
}



module.exports = router;