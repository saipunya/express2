const express = require('express')
const app = express();
const mysql2 = require('mysql2/promise')
const port =  3000
const mysql = require('mysql')
const path = require('path')
const ejs = require('ejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const connection = require('./database')
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const { readdirSync } = require('fs')
const loginRoutes = require('./Routes/loginRoute')
const registerRoutes = require('./Routes/registerRoute')
const dashboardRoutes = require('./Routes/dashboardRoute')
const logoutRoutes = require('./Routes/logoutRoute')


readdirSync('./Routes').map((r)=> app.use('/',require('./Routes/' + r)))
app.use('/',loginRoutes)
app.use('/',registerRoutes)
app.use('/',dashboardRoutes)
app.use('/',logoutRoutes)


app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.set('views','./views')
app.set('view engine', 'ejs')
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
// app.use(express.static(__dirname + 'public'));
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'choorat',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())



  


app.get('/', (req, res) => {
    res.render('index',
      { 
        message: req.flash('error'),
         user: req.session.user || ''
       }
    );
  });









app.listen(port,()=>{
    console.log('object listening on port 3000');
})
