let cc = console.log;

exports.logout = (req, res) => {
    cc(req.session)
    delete req.session;
    res.send(200);
}