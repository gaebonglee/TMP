const mysql = require("../../connection/mysqlConnection");

function updateReview(reviewId, userId, point, review) {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE review SET point = ?, review = ? WHERE review_id = ? AND user_id = ?";
    mysql.query(query, [point, review, reviewId, userId], (err, result) => {
      if (err) {
        console.error("Error updating review:", err);
        reject(err);
      } else {
        if (result.affectedRows > 0) {
          console.log("Review updated successfully");
          resolve({ message: "SUCCESS" });
        } else {
          console.log("No review updated");
          resolve({ message: "NO_REVIEW_UPDATED" });
        }
      }
    });
  });
}

module.exports = {
  updateReview,
};
