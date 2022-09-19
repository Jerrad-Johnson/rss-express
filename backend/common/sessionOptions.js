const {sessionSecret} = require("./sessionSecret");

exports.sessionOptions = {
    secret: sessionSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    },
}