const express = require('express')
const app = express();
const port = process.env.PORT || 5000
const path = require('path')
const ejs = require('ejs')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const db = require('./database')
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcryptjs')



// app.use(express.static('public'))

app.set('views','./views')
app.set('view engine', 'ejs')
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))

app.use(express.json())
app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'choorat',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

// app.get('/',(req, res) => {
//     res.render('index')

//   })
  // app.get('/users',(req, res) => {
  //       mysql.createConnection({
  //       host: 'localhost',
  //       user: 'naimet_user',
  //       database: 'naimet_db',
  //       password: 'sumet4631022',
  //   }).then((conn)=>{
  //       conn.query('SELECT * FROM tbl_user')
  //       .then((result)=>{
  //         res.json(result[0])
  //       })
  //   })
  // })


// Routes
app.get('/', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

app.post('/register', async (req, res) => {
  const { username, password , fullname } = req.body;

  // Check if the user already exists
  db.query('SELECT * FROM tbl_user WHERE use_username = ?', [username], async (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
          req.flash('error', 'Username already exists.');
          return res.redirect('/register');
      }

      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
          'INSERT INTO tbl_user (use_username, use_password,use_fullname) VALUES (?, ? , ?)',
          [username, hashedPassword,fullname],
          (err, result) => {
              if (err) throw err;
              res.redirect('/');
          }
      );
  });
});

app.post('/login', (req, res) => {
  const { username, password} = req.body;

  // Check user in database
  db.query('SELECT * FROM tbl_user WHERE use_username = ?', [username], async (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
          req.flash('error', 'Invalid username or password.');
          return res.redirect('/');
      }


      // const isMatch = await bcrypt.compare(password, user.password);

      const user = result[0];
        const isMatch = await bcrypt.compare(password, user.use_password);

        if (!isMatch) {
            req.flash('error', 'Invalid username or password.');
            return res.redirect('/');
        }

        // Save user session
        req.session.user = user;
        console.log(user);
        res.redirect('/dashboard');

  

  
  });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
      req.flash('error', 'Please log in first.');
      return res.redirect('/');
  }else{
    res.render('dashboard', { user: req.session.user });
  }

});


app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
      if (error) throw error;
      res.redirect('/');
  });
});





//   app.get('/todos',(req, res) => {

// const callApi = async () => {
//   await axios.get("https://jsonplaceholder.typicode.com/todos")
//   .then((result) => {
//     res.json(result.data);
//   })
// }
// callApi();
// })
//   app.get('/person',(req, res) => {
//     res.render('person', {
//        name :{
//         firstName : 'sumet',
//         lastName : 'choorat'
//        },
//        address : {
//         city : 'chaiyaphum',
//         country : 'bangkok'
//        },children : ['Micky','Mint']
//     })
// })
app.listen(port, ()=>{
    console.log('object listening on port 5000');
})
