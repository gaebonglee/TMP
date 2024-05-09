const mysql = require("../../connection/mysqlConnection");

function deleteReview(reviewId) {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM review WHERE review_id = ?";
    mysql.query(query, [reviewId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  deleteReview,
};
