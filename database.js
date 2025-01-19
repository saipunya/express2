const mysql = require('mysql2')
const db = mysql.createConnection({
        host: 'localhost',
        user: 'naimet_user',
        database: 'naimet_db',
        password: 'sumet4631022',
    })
    db.connect((err)=>{
        if(err) throw err;
        console.log('Connect to the database ...');
    })
    module.exports = db;


