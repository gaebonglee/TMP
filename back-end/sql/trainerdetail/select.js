const connection = require("../../connection/mysqlConnection");

async function selectTrainerInfo1(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `select
      a.user_name,
      b.user_id, 
      b.intro, 
      b.short_intro, 
      b.trainning_type,
      b.intro_img, 
      c.weekday_start, 
      c.weekday_end, 
      c.saturday_start, 
      c.saturday_end, 
      c.sunday_start, 
      c.sunday_end, 
      c.dayoff, 
      c.note, 
      c.weekday, 
      c.saturday, 
      c.sunday,
      d.center_name,
      d.center_address,
      d.center_street_address,
      d.latitude,
      d.longitude
 from user a join trainer b on a.user_id = b.user_id 
             left join trainer_schedule c on b.user_id = c.user_id 
             left join center d on b.center_id = d.center_id
 where a.user_roles = "trainer"
 and a.user_id = ?`;

    connection.execute(query, [trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function selectTrainerInfo2(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    select
      a.certification_type, 
      a.certification_name, 
      a.certification_img,
      b.user_id
    from certification_table a join user b on a.user_id = b.user_id
    where b.user_id = ? and b.user_roles = "trainer";`;

    connection.execute(query, [trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function selectTrainerInfo3(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    select 
      a.program_id, 
      a.user_id, 
      a.title, 
      a.program_img, 
      a.program_exp, 
      group_concat(b.specialty) as specialty
    from program a  join program_specialty b on a.program_id = b.program_id and a.user_id = b.user_id 
                    join user c on b.user_id = c.user_id 
    where c.user_id = ? and c.user_roles = "trainer";`;

    connection.execute(query, [trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

async function selectTrainerInfo4(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    select 
      a.count, 
      a.total_price 
    from trainer_price a join user b on a.user_id = b.user_id
    where b.user_id = ? and b.user_roles = "trainer";`;

    connection.execute(query, [trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}
async function selectTrainerInfoReview(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    select 
      c.review_id, 
      c.received_id, 
      c.user_id, 
      c.point
    from 	user a 
		      join trainer b on a.user_id = b.user_id
          join review c on b.user_id = c.received_id
    where a.user_roles = "trainer" and b.user_id = ?;`;

    connection.execute(query, [trainerId], (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  selectTrainerInfo1,
  selectTrainerInfo2,
  selectTrainerInfo3,
  selectTrainerInfo4,
  selectTrainerInfoReview,
};
