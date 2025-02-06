const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const connection = require('../database')





router.get('/login', (req, res) => {

    res.render('login', { message: req.flash('error'),user : req.session.user });

  });

router.post('/login', (req, res) => {
    const { username, password} = req.body;

    // Check user in database
    connection.query('SELECT * FROM tbl_user WHERE use_username = ?', [username], async (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            req.flash('error', 'Invalid username or password.');
            return res.redirect('/login');
        }


        // const isMatch = await bcrypt.compare(password, user.password);

        const user = result[0];
          const isMatch = await bcrypt.compare(password, user.use_password);

          if (!isMatch) {
              req.flash('error', 'Invalid username or password tt.');
              return res.redirect('/login');
          }

          // Save user session
          req.session.user = user;
          req.session.id = user.use_id;

          res.redirect('/dashboard');
    });
  });




module.exports = router
