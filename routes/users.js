const express = require('express');
const router = express.Router();

// Car brand
router.get('/managers', (req, res) => {
    res.send('Sari, John, Hilla');
  })
  
  // car models
  router.get('/workers', (req, res) => {
    res.send('Manu, Sina, Mark');
  })

  module.exports = router