const express = require("express");
const router = express.Router();

const sql = require("../sql/mainpage/selectMainpage");

router.get("/selectRandomTrainer", async (req, res) => {
  const trainerId = req.params.trainerId;
  try {
    const randomTrainerInfo = await sql.selectRandomFourTrainer();

    res.status(200).send({ info: randomTrainerInfo });
  } catch (err) {
    console.log("error while selectRandomFourTrainer:", err);
  }
});

module.exports = router;
