const express = require("express");
const router = express.Router();
const { selectTrainerName } = require("../sql/reservation/selectTrainerName");
const { saveReservation } = require("../sql/reservation/saveReservation");

// 트레이너 이름 가져오기
router.get("/trainer/:userId", (req, res) => {
  // console.log("Requested user ID:", req.params.userId);
  const userId = req.params.userId;
  selectTrainerName(userId, (error, name) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else if (name) {
      res.json({ name });
    } else {
      res.status(404).send({ error: "Trainer not found" });
    }
  });
});

// 예약 정보 저장
router.post("/saveReservation", (req, res) => {
  const reservationData = req.body;
  saveReservation(reservationData, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error saving reservation" });
    } else {
      res.status(200).json({
        message: "Reservation saved successfully",
        reservationId: results.insertId,
      });
    }
  });
});
module.exports = router;
