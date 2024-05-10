const connection = require("../../connection/mysqlConnection");

function selectLesson(reservationDate, trainerId, callback) {
  console.log("Requested date format:", reservationDate);

  connection.query(
    "SELECT u.user_name, r.reservation_time, r.selected_list " +
      "FROM reservation r " +
      "JOIN user u ON r.user_id = u.user_id " +
      "WHERE r.reservation_date = ? AND r.received_trainer_id = ?",
    [reservationDate, trainerId],
    function (error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}


module.exports = { selectLesson };
