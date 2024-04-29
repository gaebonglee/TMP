const mysql = require("../../connection/mysqlConnection");

function selectCenterAll(callback) {
  mysql.query(
    `select * 
    from user u
    LEFT JOIN review r ON u.user_id = r.user_id
    LEFT JOIN trainer t ON u.user_id = t.user_id
    LEFT JOIN center c ON t.center_id = c.center_id
    
    
    where user_roles='trainer';`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}

function selectPrice(user_id, callback) {
  mysql.query(
    `SELECT *
     FROM trainer_price
     WHERE user_id = ?`,
    [user_id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}

function selectCountReview(user_id, callback) {
  mysql.query(
    `SELECT IFNULL(COUNT(*), 0) as review_total_count,
     IFNULL(AVG(point), 0) as review_avg_star 
     FROM review
      WHERE user_id = ?`,
    [user_id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const reviewData = {
          review_total_count: result[0].review_total_count,
          review_avg_star: result[0].review_avg_star,
        };
        callback(null, reviewData);
      }
    }
  );
}
function selectCenter(callback) {
  mysql.query(
    `select * 
    from center c
    JOIN trainer t ON c.center_id = t.center_id;
    `,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
}

function selectFilter(filter, callback) {
  let lat = 0;
  let long = 0;
  console.log(filter);
  switch (filter.meter) {
    case 500:
      lat = 0.0045;
      long = 0.0055;
      break;
    case 1000:
      lat = 0.009;
      long = 0.011;
      break;
    case 1500:
      lat = 0.0135;
      long = 0.0165;
      break;
    case 2000:
      lat = 0.018;
      long = 0.022;
      break;
    case 2500:
      lat = 0.0225;
      long = 0.0275;
    case 3000:
      lat = 0.027;
      long = 0.0405;
      break;
  }

  mysql.query(
    `SELECT *
     FROM center c
     JOIN trainer t ON c.center_id = t.center_id
     JOIN trainer_price tp ON t.user_id = tp.user_id
     JOIN user u ON t.user_id = u.user_id
     WHERE c.latitude BETWEEN ${filter.latitude - lat} AND ${
      filter.latitude + lat
    }
  AND c.longitude BETWEEN ${filter.longitude - long} AND ${
      filter.longitude + long
    }
    AND tp.total_price / tp.count <= ${filter.price * 10000}
    AND (u.gender IN ('m', 'f') OR '${filter.gender}' = 'all')

      
      `,
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

function selectCurrentLocation(currentLocation, callback) {
  mysql.query(
    `SELECT *
     FROM center c
     JOIN trainer t ON c.center_id = t.center_id
     JOIN user u ON t.user_id = u.user_id
     WHERE c.latitude BETWEEN ${currentLocation.SWlatitude} AND ${currentLocation.NElatitude}
     AND c.longitude BETWEEN ${currentLocation.SWlongitude} AND ${currentLocation.NElongitude}`,
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
  selectCenterAll,
  selectFilter,
  selectCenter,
  selectCurrentLocation,
  selectCountReview,
  selectPrice,
};
