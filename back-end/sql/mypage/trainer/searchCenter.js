const mysql = require("../../../connection/mysqlConnection");

function searchCenter(center){
    const sql = `select center_name, center_street_address, center_id from center where center_name like ?`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[`%${center}%`], (err, result) => {
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

module.exports = {searchCenter};