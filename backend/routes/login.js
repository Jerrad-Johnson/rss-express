const {router} = require("../utils/fns");
const {loginControllerPost} = require("../controllers/loginControllerPost");
const {getUserDataControllerPost} = require("../controllers/getUserDataControllerPost");
const cc = console.log;


router.post('/', loginControllerPost);
router.post('/getuserdata', getUserDataControllerPost);

module.exports = router;
