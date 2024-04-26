// sql/review/insert.js
const mysql = require("../../connection/mysqlConnection");

function insertReviewAll({ userId, point, reviewImg, review }) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO review (user_id, point, review_img, review) VALUES (?, ?, ?, ?)";
    mysql.query(query, [userId, point, reviewImg, review], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        console.log(result + "insert.js");
      }
    });
  });
}

module.exports = { insertReviewAll };
