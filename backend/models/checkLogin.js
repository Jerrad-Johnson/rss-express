const {pool} = require("../common/pool");
const cc = console.log;

exports.checkLogin = (req, res) => {
    pool.query('INSERT INTO users(email, user_id) VALUES("test@test.com", 9001)');

    pool.query('SELECT * FROM users', (err, results, fields) => {
        //cc(err)
        //cc(results)
        //cc(fields)
    });
}