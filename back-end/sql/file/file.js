const connection = require("../../connection/mysqlConnection");

function selectCenter(data, callback) {
  connection.query(
    "SELECT center_id, center_address, center_img from center where center_id = ?",
    data,
    function (error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = {
  selectCenter,
};
