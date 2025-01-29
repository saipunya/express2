

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'naimet'

    // *** -----------------hosting online----------------------------------- ***
    // host : 'localhost',
    // user : 'naimet_user',
    // password : 'sumetchoorat4631022',
    // database : 'naimet_db'
    })


        connection.connect((err) => {
            if(err) {
                console.log('Error connecting to Db', err.message);
                return;
            }
            console.log('Connection Completely Connected');
        });
    module.exports = connection;


