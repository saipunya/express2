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
// const connection = require('./db')
const flash = require('connect-flash')
const session = require('express-session')
const bcrypt = require('bcryptjs')



app.use(express.static(__dirname + '/public'));

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





  // app.get('/users', async (req, res) => {
  //   try{
  //     const conn =  await mysql.createConnection({
  //       host: 'localhost',
  //       user: 'naimet_user',
  //       database: 'naimet_db',
  //       password: 'sumetchoorat4631022',
  //   })
  //       const result = await conn.query('SELECT * FROM tbl_user')
  //       res.json(result[0])
  //   }
  //   catch(err){
  //     console.error('Error user: ' + err.message)
  //     res.status(500).json({error: 'Error user: ' + err.message})
  //   }
      
  //   })
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'naimet_user',
  password: 'sumetchoorat4631022',
  database: 'naimet_db',
})

// Routes


app.get('/', (req, res) => {
    res.render('index',{ message: req.flash('error') });
  });
app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});
app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

app.post('/register', async (req, res) => {
  const { username, password , fullname } = req.body;

  // Check if the user already exists
  connection.query('SELECT * FROM tbl_user WHERE use_username = ?', [username], async (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
          req.flash('error', 'Username already exists.');
          return res.redirect('/register');
      }

      // Hash password and save user
      const hashedPassword = await bcrypt.hash(password, 10);




      connection.query(
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
  connection.query('SELECT * FROM tbl_user WHERE use_username = ?', [username], async (err, result) => {
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
        req.session.id = user.use_id;
 
        res.redirect('/dashboard');

  

  
  });
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
      req.flash('error', 'Please log in first.');
      return res.redirect('/');
  }else{
 
    res.render('dashboard', { user: req.session.user });
    console.log(req.session.id);
  }

});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/');
  });
});

app.listen(port,()=>{
    console.log('object listening on port 3000');
})
