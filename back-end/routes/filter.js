const express = require("express");
const router = express.Router();
const selectCenter = require("../sql/totaltrainermap/select");

router.post("/", (req, res) => {
  selectCenter.selectFilter(req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
