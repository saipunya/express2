const mysql = require('mysql2')
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'naimet',
        password: 'sumet4631022',
    })
    db.connect((error)=>{
        if(error) throw error;
        console.log('Connect to the database ...');
    })
    module.exports = db;


