const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('index',
      {
        message: req.flash('error'),
         user: req.session.user || ''
       }
    );
  });
  module.exports = router