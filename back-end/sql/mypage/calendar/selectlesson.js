const connection = require("../../../connection/mysqlConnection");

function selectLesson(date, callback) {
    connection.query(
        "SELECT u.user_name, r.reservation_date, r.reservation_time " +
        "FROM reservation r " +
        "JOIN user u ON r.user_id = u.user_id " +
        "WHERE r.reservation_date = ?",
        [date],
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
    selectLesson,
};