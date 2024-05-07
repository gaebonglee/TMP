const mysql = require("../../connection/mysqlConnection");

function insertReviewAll({ user_id, point, review_img, review, received_id }) {
  
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO review (user_id, point, review_img, review, received_id) VALUES (?, ?, ?, ?, ?)";
    mysql.query(
      query,
      [user_id, point, review_img, review, received_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

module.exports = {
  insertReviewAll,
};
