
// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = null
const initMysql = () => {
    connection = mysql.createConnection({
        host: 'localhost',
        user    : 'naimet_user',
        database: 'naimet_db',
        password : 'sumetchoorat4631022',

    })
}
module.exports = connection;
  