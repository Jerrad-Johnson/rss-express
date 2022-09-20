const {router} = require("../utils/fns");
const {optionsControllerPost} = require("../controllers/optionsControllerPost");
const cc = console.log;

router.post('/options', optionsControllerPost);

module.exports = router;
