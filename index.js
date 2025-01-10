const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const ejs = require('ejs')
const mysql = require('mysql2/promise');


const cors = require('cors')
const bodyParser = require('body-parser')


// app.use(express.static('public'))

app.set('views','./views')
app.set('view engine', 'ejs')
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.render('index')

  })
  app.get('/user',(req, res) => {
        mysql.createConnection({
        host: 'localhost',
        user: 'naimet_user',
        database: 'naimet_db',
        password: 'sumet4631022'
    }).then((conn)=>{
        conn.query('SELECT * FROM tbl_user')
        .then((result)=>{
          res.json(result[0])
        })
    })
  })
  app.get('/person',(req, res) => {
    res.render('person', {
       name :{
        firstName : 'sumet',
        lastName : 'choorat'
       },
       address : {
        city : 'chaiyaphum',
        country : 'bangkok'
       },children : ['Micky','Mint']
    })
})
app.listen(port, ()=>{
    console.log('object listening on port 5000');
})
