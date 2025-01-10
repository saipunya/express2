const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
const ejs = require('ejs')

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
