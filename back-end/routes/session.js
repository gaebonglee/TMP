const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/checkSession", (req, res) => {
  console.log("session : ", req.session);
  res.send(req.session);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
  });
  res.send("success logout");
});

module.exports = router;
