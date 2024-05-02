const connection = require("../../connection/mysqlConnection");

const saveReservation = (reservationData, callback) => {
    const { reservation_date, reservation_time, user_id, received_trainer_id, selected_list } = reservationData;
    connection.query(
        'INSERT INTO reservation (reservation_date, reservation_time, user_id, received_trainer_id, selected_list) VALUES (?, ?, ?, ?, ?)',
        [reservation_date, reservation_time, user_id, received_trainer_id, selected_list],
        (error, results) => {
            if (error) {
                console.error("Error inserting reservation data: ", error);
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};

module.exports = {
    saveReservation
};