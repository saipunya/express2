const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path')
// app.use(express.static('public'))
app.set('views','./views')
app.set('view engine', 'ejs')
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.get('/',(req, res) => {
    res.send('index',{
      title : 'Welcome to website'
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
