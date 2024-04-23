const mysql = require("../../connection/mysqlConnection");

function selectCenterAll(callback) {
  mysql.query(
    `SELECT 
    t.intro_img,
    c.center_address,
    c.center_name,
    c.latitude,
    c.longitude,
    tp.count,
    tp.total_price,
    u.user_name
  FROM 
    trainer t
    JOIN center c ON t.center_id = c.center_id
    JOIN trainer_price tp ON t.user_id = tp.user_id
    JOIN user u ON t.user_id=u.user_id;`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
        console.log(result);
      }
    }
  );
}

module.exports = {
  selectCenterAll: selectCenterAll,
};
