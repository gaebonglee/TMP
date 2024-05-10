const connection = require("../../connection/mysqlConnection");

function selectLessonDates(trainerId, callback) {
  connection.query(
    "SELECT DISTINCT reservation_date FROM reservation WHERE received_trainer_id = ?",
    [trainerId],
    function (error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = { selectLessonDates };
