const {doesUserExist} = require("../models/login/checkLogin");
const {errorExistsInScript, errorExistsNotInScript} = require("../common/variables");
const {createUser} = require("../models/login/createUser");
const cc = console.log;

exports.loginControllerPost = async (req, res) => {
    let results;

    results = await doesUserExist(req, res);
    if (results.error === errorExistsInScript) return;

    if (!results.data?.[0]){
        results = await createUser(req, res);
        if (results.error === errorExistsInScript) return;

    }



    //cc(results.data[0].email);



}