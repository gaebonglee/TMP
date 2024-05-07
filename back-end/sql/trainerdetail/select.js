const connection = require("../../connection/mysqlConnection");

async function selectTrainerInfo1(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `select
      a.user_name,
      a.user_img,
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
      d.center_id,
      d.center_name,
      d.center_address,
      d.center_street_address,
      d.center_intro,
      d.center_img,
      d.center_vr_img,
      d.latitude,
      d.longitude,
      e.weekday_start as center_weekday_start,
      e.weekday_end as center_weekday_end,
      e.saturday_start as center_saturday_start,
      e.saturday_end as center_saturday_end,
      e.sunday_start as center_sunday_start,
      e.sunday_end as center_sunday_end,
      e.dayoff as center_dayoff,
      e.note as center_note,
      e.weekday as center_weekday,
      e.saturday as center_saturday,
      e.sunday as center_sunday
 from user a join trainer b on a.user_id = b.user_id 
             left join trainer_schedule c on b.user_id = c.user_id 
             left join center d on b.center_id = d.center_id
             left join center_schedule e on d.center_id = e.center_id
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
      a.certification_id,
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
    SELECT
  a.program_id,
  a.user_id,
  a.title,
  a.program_img,
  a.program_exp,
  GROUP_CONCAT(b.specialty) AS specialty
FROM
  program a
JOIN
  program_specialty b ON a.program_id = b.program_id AND a.user_id = b.user_id
JOIN
  user c ON a.user_id = c.user_id
WHERE
  c.user_id = ? AND c.user_roles = "trainer"
GROUP BY
  a.program_id, a.user_id, a.title, a.program_img, a.program_exp;`;

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
    where b.user_id = ? and b.user_roles = "trainer"
    order by a.count desc`;

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

async function selectCenterPrice(trainerId) {
  return new Promise((resolve, reject) => {
    const query = `
    select 
      d.center_id,
      d.month,
      d.total_price
    from user a join trainer b on a.user_id = b.user_id
                left join center c on b.center_id = c.center_id
                left join center_price d on c.center_id = d.center_id
    where b.user_id = ? 
    order by d.month desc`;

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
  selectCenterPrice,
};
