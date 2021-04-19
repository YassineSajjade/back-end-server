const mysql = require('mysql');

/* if you want to use SGBD */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mystore'
});

module.exports = db;