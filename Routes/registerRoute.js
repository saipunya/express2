const express = require('express')
const router = express.Router()




router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

router.post('/register', async (req, res) => {
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




module.exports = router
