const express = require("express");
const router = express.Router();
const selectCenter = require("../sql/totaltrainermap/select");

router.get("/", (req, res) => {
  selectCenter.selectCenterAll((err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
      
    }
  });
});

module.exports = router;
