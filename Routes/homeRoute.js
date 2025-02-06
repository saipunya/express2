const express = require('express')
const router = express.Router()
const connection = require('../database')


router.get('/', (req, res) => {
   // Check user in database
   connection.query('SELECT * FROM download ORDER BY down_savedate DESC LIMIT 20', async (err, result) => {
    if (err) throw err;


    res.render('index',
      {
        message: req.flash('error'),
         user: req.session.user || '',
         data : result
       }
    );

  });

  });
  module.exports = router