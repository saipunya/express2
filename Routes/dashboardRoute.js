const express = require('express')
const router = express.Router()




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
