const {router} = require("../utils/fns");
const {loginControllerPost} = require("../controllers/loginControllerPost");
const {getUserDataControllerPost} = require("../controllers/getUserDataControllerPost");
const {logoutControllerPost} = require("../controllers/logoutControllerPost");
const cc = console.log;


router.post('/', loginControllerPost);
router.post('/getuserdata', getUserDataControllerPost);
router.post('/logout', logoutControllerPost);

module.exports = router;
