const express = require("express");
const router = express.Router();
const selectLesson = require("../sql/mypage/calendar/selectlesson");

router.post("/selectLesson", async (req, res) => {
  try {
    const { date } = req.body;
    selectLesson(date, (error, results) => {
      if (error) {
        console.error("Error selecting lessons:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
