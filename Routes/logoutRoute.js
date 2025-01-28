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



router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/');
  });
});

module.exports = router
