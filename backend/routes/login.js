const {router} = require("../utils/fns");
const {corsDecorated} = require("../common/decorators");
const {loginControllerPost} = require("../controllers/loginControllerPost");
const cc = console.log;

router.use(corsDecorated);

router.post('/', loginControllerPost);

module.exports = router;
