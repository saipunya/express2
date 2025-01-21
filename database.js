
const dotenv = require('dotenv').config();
const mysql = require('mysql2');
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'naimet_user',
//     password: 'sumetchoorat4631022',
//     database: 'naimet_db',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });
  
//   db.getConnection((err, connection) => {
//     if (err) {
//       console.error('Connection error:', err.message);
//       return;
//     }
//     console.log('Connected to the database.');
//     connection.release();
//   });


const db = mysql.createConnection({
    // host : 'localhost',
    // user : 'naimet_user',
    // password : 'sumetchoorat4631022',
    // database : 'naimet_db',


        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
    })
    

        db.connect((err) => {
            if(err) {
                console.log('Error connecting to Db', err.message);
                return;
            }
            console.log('Connection established');
        });
    module.exports = db;


