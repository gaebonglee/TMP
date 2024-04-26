// sql/review/select.js
const mysql = require("../../connection/mysqlConnection");

function selectReviewAll(callback) {
  mysql.query(
    `SELECT *
    FROM review r 
    JOIN user u ON r.user_id = u.user_id;
    `,

    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}

module.exports = { selectReviewAll };
