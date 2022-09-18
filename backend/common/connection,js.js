const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: 3306,
    user: 'rss-express-admin',
    password: 'nmWhn812*!mNB2Qz',
    database: 'rss-express',
});

exports.pool = pool;
