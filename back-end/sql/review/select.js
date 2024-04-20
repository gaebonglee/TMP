const mysql = require("../../connection/mysqlConnection");

function selectReviewAll(callback) {
  mysql.query(
    `SELECT 
    * ,count(*) as 'total_review'
  FROM 
    review r
    
    JOIN trainer_price tp ON r.user_id = tp.user_id
    JOIN user u ON u.user_id=r.user_id 
  WHERE 
    r.user_id = '0123_test';`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
        
      }
    }
  );
}

module.exports = {
  selectReviewAll: selectReviewAll,
};
