const express = require("express");
const axios = require("axios");
const router = express.Router();
const sql = require("../sql/trainerdetail/select");

router.get("/:trainerId", async (req, res) => {
  const trainerId = req.params.trainerId;
  try {
    const info1 = await sql.selectTrainerInfo1(trainerId);
    const info2 = await sql.selectTrainerInfo2(trainerId);
    const info3 = await sql.selectTrainerInfo3(trainerId);
    const info4 = await sql.selectTrainerInfo4(trainerId);
    const infoReview = await sql.selectTrainerInfoReview(trainerId);
    const centerPrice = await sql.selectCenterPrice(trainerId);

    res
      .status(200)
      .send({ info1: info1[0], info2, info3, info4, infoReview, centerPrice });
  } catch (err) {
    console.log("error while selectTrainerInfo1:", err);
  }
});

module.exports = router;
