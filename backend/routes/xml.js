const {router} = require("../utils/fns");
const {xmlControllerGet} = require("../controllers/xmlControllerGet");
const {corsDecorated} = require("../common/decorators");
const cc = console.log;

router.use(corsDecorated);

router.post('/getXML', xmlControllerGet);

module.exports = router;

