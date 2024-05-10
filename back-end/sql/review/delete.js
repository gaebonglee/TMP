const mysql = require("../../connection/mysqlConnection");

function deleteReview(reviewId, userId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM review WHERE review_id = ? AND user_id = ?";
    mysql.query(query, [reviewId, userId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          resolve({ message: "SUCCESS" });
        } else {
          resolve({ message: "NO_REVIEW_DELETED" });
        }
      }
    });
  });
}

module.exports = { deleteReview };
