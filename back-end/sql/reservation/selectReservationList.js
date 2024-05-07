const connection = require("../../connection/mysqlConnection");

function selectReservationList(userId, callback) {
  const sqlQuery = `
    SELECT u.user_name AS trainer_name, r.reservation_date, r.reservation_time, r.selected_list
    FROM reservation r
    JOIN user u ON r.received_trainer_id = u.user_id
    WHERE r.user_id = ?`;

  connection.query(sqlQuery, [userId], function (error, results) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}
module.exports = { selectReservationList };
