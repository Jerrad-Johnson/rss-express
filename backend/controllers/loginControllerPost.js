const {checkLogin} = require("../models/checkLogin");
const cc = console.log;

exports.loginControllerPost = async (req, res) => {
    checkLogin(req, res);

}