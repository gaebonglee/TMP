const mysql = require("../../../connection/mysqlConnection");

function selectCoach(user_id) {
  // Define the SQL query
  console.log(user_id)
  const sql = `SELECT u.user_name, u.email, u.phonenumber, u.user_id, t.trainning_type, c.center_name, c.center_id FROM user u JOIN trainer t ON u.user_id = t.user_id LEFT JOIN center c ON t.center_id = c.center_id where u.user_id = ?`;

  // Return a new promise that encapsulates the asynchronous operation
  return new Promise((resolve, reject) => {
    // Execute the SQL query
    mysql.query(sql, [user_id], (err, result) => {
      if (err) {
        console.log("Error!!"); // Log the error
        reject(err); // Reject the promise if there is an error
      } else {
        console.log("selectCoach", result); // Log the result
        resolve(result); // Resolve the promise with the result
      }
    });
  });
}

module.exports = { selectCoach };
