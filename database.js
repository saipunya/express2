const mysql = require('mysql2')
const db = mysql.createPool({
    host: 'localhost',
    user: 'naimet_user',
    password: 'sumetchoorat4631022',
    database: 'naimet_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Connection error:', err.message);
      return;
    }
    console.log('Connected to the database.');
    connection.release();
  });


// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'test_user',
//     password : 'sumetchoorat4631022',
//     database : 'test_db',


        // host: 'localhost',
        // user: 'root',
        // database: 'naimet',
        // password: 'sumet4631022',
    // })
    // db.connect((err)=>{
    //     if (err) {
    //         res.status(501).send("database query error");
    //         return;
    //     }
    //     console.log('Connect to the database ...');
    // })
    module.exports = db;


