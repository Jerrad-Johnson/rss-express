const {router} = require("../utils/fns");
const {xmlControllerGet} = require("../controllers/xmlControllerGet");
const cc = console.log;

router.post('/getXML')

router.post('/getXML', xmlControllerGet);

module.exports = router;
