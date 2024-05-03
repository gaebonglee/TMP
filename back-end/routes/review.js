const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // multer 미들웨어 생성

const selectReviewAll = require("../sql/review/select");
const insertReviewAll = require("../sql/review/insert");

// multer 미들웨어 적용
router.use(upload.any());

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
  console.log(req.body); // 이제 req.body에 데이터가 포함됩니다.
  const { user_id, point, review, review_img, received_id } = req.body;
  insertReviewAll
    .insertReviewAll({
      user_id,
      point,
      review_img,
      review,
      received_id,
    })
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
