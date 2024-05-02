const mysql = require("../../connection/mysqlConnection");

function selectReviewByTrainerId(trainerId, callback) {
  const query = `
    SELECT r.*, u.user_name
    FROM review r
    JOIN user u ON r.user_id = u.user_id
    WHERE r.received_id = ?
  `;
  mysql.query(query, [trainerId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  selectReviewByTrainerId,
};
