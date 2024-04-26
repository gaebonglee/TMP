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

//LeftEdit.jsx의 (레슨가격 부분)
function selectTrainerPrice(data, callback) {
  connection.query(
    "SELECT count, total_price from trainer_price where user_id = ?",
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

function updateTrainerPrice(data, callback) {
  connection.query(
    "UPDATE trainer_price SET count = ?, total_price = ? WHERE user_id = ?",
    [data.count, data.total_price, data.user_id],
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
  selectTrainerPrice,
  updateTrainerPrice,
};
