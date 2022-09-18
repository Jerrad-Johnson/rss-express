const {checkLogin, doesUserExist} = require("../models/checkLogin");
const {errorExistsInScript, errorExistsNotInScript} = require("../common/variables");
const cc = console.log;

exports.loginControllerPost = async (req, res) => {
    let results;

    results = await doesUserExist(req, res, req.body.email);
    if (results.error === errorExistsInScript) return;




    cc(results.data[0].email);



}