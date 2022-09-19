let cc = console.log;

exports.confirmLoggedIn = (req, res, queryResults) => {
    req.session.email = req.body.email;
    req.session.userid = queryResults.data[0].id;
    req.session.isLoggedIn = "true";
    res.status(200).send({loggedIn: true, email: req.session.email})
}