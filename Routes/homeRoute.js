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

router.get('/', (req, res) => {
    res.render('index',
      {
        message: req.flash('error'),
         user: req.session.user || ''
       }
    );
  });
  module.exports = router