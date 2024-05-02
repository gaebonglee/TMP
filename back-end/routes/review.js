const express = require("express");
const router = express.Router();
const selectReviewAll = require("../sql/review/select");
const insertReviewAll = require("../sql/review/insert");

// 트레이너별 리뷰 목록 가져오기
router.get("/:trainerId", (req, res) => {
  const { trainerId } = req.params;
  selectReviewAll.selectReviewByTrainerId(trainerId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

// 새로운 리뷰 작성
router.post("/", (req, res) => {
  const { userId, point, reviewImg, review, received_id } = req.body;
  insertReviewAll
    .insertReviewAll({ userId, point, reviewImg, review, received_id })
    .then((result) => {
      console.log(result + "insert.js");
      res.status(200).json({ message: "SUCCESS" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
