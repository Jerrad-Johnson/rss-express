const {router} = require("../utils/fns");
const cors = require('cors');
const corsSettings = require('../common/corsSettings');
const {loginControllerPost} = require("../controllers/loginControllerPost");

const cc = console.log;

router.use(cors(corsSettings));

router.post('/', loginControllerPost);

module.exports = router;
