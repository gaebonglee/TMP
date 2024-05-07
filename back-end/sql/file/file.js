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

async function selectTrainerSchedule(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    select user_id from trainer_schedule where user_id = ?;`;

    connection.execute(query, [userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function insertTrainerSchedule(schedule, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    insert into trainer_schedule(user_id, weekday_start, weekday_end, saturday_start, saturday_end, sunday_start, sunday_end, dayoff, note, weekday, saturday, sunday) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    connection.execute(
      query,
      [
        userId,
        schedule.weekday_start,
        schedule.weekday_end,
        schedule.saturday_start,
        schedule.saturday_end,
        schedule.sunday_start,
        schedule.sunday_end,
        schedule.dayoff,
        schedule.note,
        schedule.weekday,
        schedule.saturday,
        schedule.sunday,
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

async function updateTrainerSchedule(schedule, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update trainer_schedule 
    set weekday_start = ?, 
    weekday_end = ?, 
    saturday_start = ?, 
    saturday_end = ?, 
    sunday_start = ?, 
    sunday_end = ?, 
    dayoff = ?, 
    note = ?, 
    weekday = ?, 
    saturday = ?, 
    sunday = ?
    where user_id = ?;`;

    connection.execute(
      query,
      [
        schedule.weekday_start,
        schedule.weekday_end,
        schedule.saturday_start,
        schedule.saturday_end,
        schedule.sunday_start,
        schedule.sunday_end,
        schedule.dayoff,
        schedule.note,
        schedule.weekday,
        schedule.saturday,
        schedule.sunday,
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

async function insertTrainerProgram(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    insert into program(user_id, title, program_img, program_exp) values(?, ?, ?, ?);`;

    connection.execute(
      query,
      [userId, data.title, data.newImgArr, data.program_exp],
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

async function updateTrainerProgram(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update program set title = ?, program_img = ?, program_exp = ? where program_id = ? and user_id = ?;`;

    connection.execute(
      query,
      [data.title, data.newImgArr, data.program_exp, data.program_id, userId],
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

async function deleteTrainerProgram(programId, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    delete from program where program_id = ? and user_id = ?;`;

    connection.execute(query, [programId, userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function insertTrainerProgramSpecialty(programId, userId, data) {
  return new Promise((resolve, reject) => {
    const query = `
    insert into program_specialty(program_id, user_id, specialty) values(?, ?, ?);`;

    connection.execute(
      query,
      [programId, userId, data],
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

async function deleteTrainerProgramSpecialty(programId, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    delete from program_specialty where program_id = ? and user_id = ?;`;

    connection.execute(query, [programId, userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function deleteTrainerPrice(userId) {
  return new Promise((resolve, reject) => {
    const query = `
    delete from trainer_price where user_id = ?;`;

    connection.execute(query, [userId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function insertTrainerPrice(userId, data) {
  return new Promise((resolve, reject) => {
    const query = `
    insert into trainer_price(user_id, count, total_price) values(?, ?, ?);`;

    connection.execute(
      query,
      [userId, data.count, data.total_price],
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

async function updateTrainerShortIntro(data, userId) {
  return new Promise((resolve, reject) => {
    const query = `
    update trainer set short_intro = ? where user_id = ?;`;

    connection.execute(query, [data, userId], (err, results, fields) => {
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
  updateTrainerIntro,
  updateTrainerCertifications,
  deleteTrainerCertifications,
  insertTrainerCertifications,
  selectTrainerSchedule,
  insertTrainerSchedule,
  updateTrainerSchedule,
  insertTrainerProgram,
  insertTrainerProgramSpecialty,
  updateTrainerProgram,
  deleteTrainerProgramSpecialty,
  deleteTrainerProgram,
  deleteTrainerPrice,
  insertTrainerPrice,
  updateTrainerShortIntro,
};
