// Connect to database
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'MSU#code1',
        database:'employees_db'
    }
);

module.exports = db;