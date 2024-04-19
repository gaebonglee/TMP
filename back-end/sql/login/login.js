const connection = require("../../connection/mysqlConnection");

connection.query("SELECT * FROM user", function (error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
  }
});
// function createUser(userData, callback) {
//   connection.query(
//     "INSERT INTO users SET ?",
//     userData,
//     function (error, results) {
//       if (error) {
//         callback(error, null);
//       } else {
//         callback(null, results.insertId);
//       }
//     }
//   );
// }
