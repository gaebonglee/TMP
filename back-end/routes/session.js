const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/checkSession', (req, res) => {
  console.log('session : ', req.session);
  res.send(req.session);
});

module.exports = router;
