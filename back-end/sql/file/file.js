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

async function updateTrainerImg(imgFiles, trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    update trainer set intro_img = ? where user_id = ?;`;

    connection.execute(query, [imgFiles, trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function updateUserImg(imgFile, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update user set user_img = ? where user_id = ?;`;

    connection.execute(query, [imgFile, userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  selectCenter,
  updateTrainerImg,
  updateUserImg,
};
