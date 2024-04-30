const mysql = require("../../connection/mysqlConnection");

function inquiry(inquiry_type, inquiry_phonenumber, inquiry_contents){
    const sql = `INSERT INTO inquiry (inquiry_phonenumber, inquiry_type, inquiry_contents) VALUES (?, ?, ?)`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[inquiry_phonenumber, inquiry_type, inquiry_contents], (err, result) => {
            if (err){
                console.log("Error: ", err)
                reject(err)
            }
            else{
                console.log("result: ", result)
                resolve(result)
            }
        });
    })
   
}

module.exports = {inquiry}