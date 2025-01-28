const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const connection = require('../database')
const bcrypt = require('bcryptjs')
router.use(session({
  secret: 'choorat',
  resave: false,
  saveUninitialized: false
}))
router.use(flash())
router.use(bodyParser.urlencoded({ extended: true }))




router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
      req.flash('error', 'Please log in first.');
      return res.redirect('/');
  }else{
 
    res.render('dashboard', { user: req.session.user });
    // console.log(req.session.id);
  }

});

module.exports = router
