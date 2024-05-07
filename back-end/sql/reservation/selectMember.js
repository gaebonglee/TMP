const connection = require("../../connection/mysqlConnection");

function selectMember(userId, callback) {
  connection.query(
    "SELECT user_name, phonenumber FROM user WHERE user_id = ?",
    [userId],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          const memberInfo = {
            name: results[0].user_name,
            phoneNumber: results[0].phonenumber,
          };
          callback(null, memberInfo);
        } else {
          callback(null, null);
        }
      }
    }
  );
}
module.exports = {
  selectMember,
};
