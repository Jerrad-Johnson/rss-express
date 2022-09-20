const {logout} = require("../models/login/logout");
let cc = console.log;

exports.logoutControllerPost = (req, res) => {
    logout(req, res);
}