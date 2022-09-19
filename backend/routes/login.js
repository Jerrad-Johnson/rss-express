const {router} = require("../utils/fns");
const {loginControllerPost} = require("../controllers/loginControllerPost");
const cc = console.log;

router.post('/', loginControllerPost);

module.exports = router;
