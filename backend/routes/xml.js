const {router} = require("../utils/fns");
const {xmlControllerGet} = require("../controllers/xmlControllerGet");
const cors = require('cors');
const cc = console.log;

router.use(cors({
    origin: "http://localhost:3000",
}));

router.post('/getXML', xmlControllerGet);

module.exports = router;

