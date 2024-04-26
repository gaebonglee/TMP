const mysql = require("../../../connection/mysqlConnection");


function selectUser(user_id) {
    // Define the SQL query
    const sql = `select user_name, email, phonenumber, user_id from user WHERE user_id = ?`;

    // Return a new promise that encapsulates the asynchronous operation
    return new Promise((resolve, reject) => {
        // Execute the SQL query
        mysql.query(sql, [user_id], (err, result) => {
            if (err) {
                console.log("Error!!");  // Log the error
                reject(err);             // Reject the promise if there is an error
            } else {
                console.log("selectUser",result);    // Log the result
                resolve(result);         // Resolve the promise with the result
            }
        });
    });
}

module.exports = {selectUser}