const express = require("express");
const router = express.Router();
const { selectTrainerName } = require("../sql/reservation/selectTrainerName");
const { saveReservation } = require("../sql/reservation/saveReservation");
const { selectLesson } = require("../sql/mypage/calendar/selectLesson");
const { selectMember } = require("../sql/reservation/selectMember");
const { selectReservation } = require("../sql/reservation/selectReservation");

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

//트레이너 회원관리 페이지 데이터 가져오기
router.get("/selectLessonInfo/:reservationDate/:trainerId", (req, res) => {
  const { reservationDate, trainerId } = req.params;
  selectLesson(reservationDate, trainerId, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Database query failed" });
    } else if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send({
        error: "No reservations found for the specified date and trainer.",
      });
    }
  });
});

//예약확인페이지 로그인한 회원정보 가져오기
router.get("/selectMember/:userId", (req, res) => {
  const userId = req.params.userId;
  selectMember(userId, (error, memberInfo) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else if (memberInfo) {
      res.json(memberInfo);
    } else {
      res.status(404).send({ error: "Member not found" });
    }
  });
});

router.get ("/selectReservation/:")
module.exports = router;
