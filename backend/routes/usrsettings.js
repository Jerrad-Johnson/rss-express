const {router} = require("../utils/fns");
const {optionsControllerPost} = require("../controllers/optionsControllerPost");
const {saveFeedsControllerPost} = require("../controllers/saveFeedsControllerPost");
const cc = console.log;

router.post('/options', optionsControllerPost);
router.post('/savefeeds', saveFeedsControllerPost);

module.exports = router;
