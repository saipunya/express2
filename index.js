const express = require('express')
const app = express();
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')

const session = require('express-session')
const { readdirSync } = require('fs')
const flash = require('connect-flash')
const loginRoutes = require('./Routes/loginRoute')
const registerRoutes = require('./Routes/registerRoute')
const dashboardRoutes = require('./Routes/dashboardRoute')
const logoutRoutes = require('./Routes/logoutRoute')
const homeRoutes = require('./Routes/homeRoute')
const ruleRoutes = require('./Routes/ruleRoute')


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
readdirSync('./Routes').map((r)=> app.use('/',require('./Routes/' + r)))


app.use('/',loginRoutes)
app.use('/',registerRoutes)
app.use('/',dashboardRoutes)
app.use('/',logoutRoutes)
app.use('/',homeRoutes)
app.use('/',ruleRoutes)

app.listen(port,()=>{
    console.log('object listening on port 3000');
})
