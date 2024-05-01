const express = require("express");
const router = express.Router();
const { selectTrainerName } = require("../sql/reservation/selectTrainerName");

router.get("/trainer/:userId", (req, res) => {
  console.log("Requested user ID:", req.params.userId);
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

module.exports = router;
