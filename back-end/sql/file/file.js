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
async function updateTrainerIntro(intro, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update trainer set intro = ? where user_id = ?;`;

    connection.execute(query, [intro, userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}
async function updateTrainerCertifications(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update certification_table 
      set certification_type = ?,
          certification_name = ?,
          certification_img = ?,
          certification_mod_date = now()
    where certification_id = ? and user_id = ?;`;

    connection.execute(
      query,
      [
        data.certification_type,
        data.certification_name,
        data.certification_img,
        data.certification_id,
        userId,
      ],
      (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
}
async function deleteTrainerCertifications(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    delete from certification_table 
    where certification_id = ? and user_id = ?;`;

    connection.execute(query, [data, userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function insertTrainerCertifications(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    insert into certification_table(user_id, certification_type, certification_name, certification_img) values(?, ?, ?, ?);`;

    connection.execute(
      query,
      [
        userId,
        data.certification_type,
        data.certification_name,
        data.certification_img,
      ],
      (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      }
    );
  });
}

module.exports = {
  selectCenter,
  updateTrainerImg,
  updateUserImg,
  updateTrainerIntro,
  updateTrainerCertifications,
  deleteTrainerCertifications,
  insertTrainerCertifications,
};
