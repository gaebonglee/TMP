const mysql = require("../../../connection/mysqlConnection");


function updateCoach(name, type, email, phonenumber, center_id, user_id) {
    // Define the SQL queries
    const updateSql = `UPDATE user SET user_name = ?, email = ?, phonenumber = ? WHERE user_id = ?`;
    const updateSql2 = `UPDATE trainer SET trainning_type = ?, center_id = ? where user_id = ?`
    // Return a new promise that encapsulates the asynchronous operation
    return new Promise((resolve, reject) => {
        // First execute the update SQL query
        mysql.query(updateSql, [name, email, phonenumber, user_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log("Error updating user:", updateErr);
                reject(updateErr);
            } else {
                console.log("User Updated result:", updateResult);
                 // Then execute the update SQL query for the trainer table
                mysql.query(updateSql2, [type, center_id, user_id], (update2Err, update2Result) => {
                    if(update2Err){
                        console.log("Error updating trainer:", update2Err);
                        reject(update2Err);
                    }
                    else{
                        console.log("Trainer updated successfully:", update2Result)
                        resolve({userUpdateResult: updateResult, trainerUpdateResult: update2Result})
                    }
                })
            }

        });
    });
}

module.exports = {updateCoach};