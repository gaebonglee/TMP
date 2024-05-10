const connection = require("../../connection/mysqlConnection");

function selectRandomFourTrainer() {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      a.user_id,
      b.user_name,
      b.user_img,
      a.trainning_type,
      c.center_name,
      (select avg(point) from review d where d.received_id = b.user_id) as point
    FROM
      trainer a join user b on a.user_id = b.user_id and b.user_roles = "trainer"
                left join center c on a.center_id = c.center_id
    ORDER BY rand() `;

    connection.execute(query, (err, results, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  selectRandomFourTrainer,
};
