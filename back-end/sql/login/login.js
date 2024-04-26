const connection = require("../../connection/mysqlConnection");

function selectUser(data, callback) {
  connection.query(
    "SELECT user_id, user_name, user_roles from user where user_id = ? and deleted_yn = N",
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

function insertUser(data, callback) {
  connection.query(
    "INSERT INTO user(user_id, deleted_yn, gender, email, phonenumber, user_roles, user_name, user_img) values(?, N, ?, ?, ?, ?, ? ,?)",
    [
      data.user_id,
      data.gender,
      data.email,
      data.phonenumber,
      data.user_roles,
      data.user_name,
      null,
    ],
    function (error, results) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

function insertTrainer(data, callback) {
  connection.query(
    "INSERT INTO trainer(user_id, deleted_yn, intro, intro_img, short_intro, center_id, trainning_type) values(?, N, '', null, null, null, null)",
    [data.user_id],
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
  insertUser,
  selectUser,
  insertTrainer,
};
