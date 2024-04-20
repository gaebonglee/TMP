const express = require("express");
const router = express.Router();
const selectReviewAll = require("../sql/review/select");

router.get("/", (req, res) => {
  selectReviewAll.selectReviewAll((err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(result);
      console.log(result);
    }
  });
});

module.exports = router;
