const {router} = require("../utils/fns");
const {xmlControllerGet} = require("../controllers/xmlControllerGet");
const cors = require('cors');
const corsSettings = require('../common/corsSettings');
const cc = console.log;

router.use(cors(corsSettings));

router.post('/getXML', xmlControllerGet);

module.exports = router;

