exports.confirmLoggedIn = (req, res) => {
    req.session.email = req.body.email;
    req.session.isLoggedIn = "true";
    res.status(200).send({loggedIn: true, email: req.session.email})
}