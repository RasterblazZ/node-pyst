const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rasterblazz',
    database: 'pst'
});


connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    // return;
    console.log('Connected to the MySQL database');
});

module.exports = connection;
