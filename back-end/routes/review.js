// routes/review.js
const express = require("express");
const router = express.Router();
const selectReviewAll = require("../sql/review/select");
const insertReviewAll = require("../sql/review/insert");

router.get("/", (req, res) => {
  selectReviewAll.selectReviewAll((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/", (req, res) => {
  const { userId, point, reviewImg, review } = req.body;

  insertReviewAll
    .insertReviewAll({ userId, point, reviewImg, review })
    .then((result) => {
      res.status(200).json({ message: "SUCCESS" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
