const connection = require("../../../connection/mysqlConnection");

//RightEdit.jsx부분(트레이너 이름, 센터명, 한줄 소개, 지도종목)
function selectUser(callback) {
  connection.query(
    "SELECT user_name from user where user_id = ?",
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
  selectUser,
};
