const connection = require("../../connection/mysqlConnection");

function selectTrainerName(userId, callback) {
  connection.query(
    "SELECT user_name FROM user WHERE user_id = ?",
    [userId],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        const name = results.length > 0 ? results[0].user_name : null;
        callback(null, name);
      }
    }
  );
}

module.exports = {
  selectTrainerName,
};
