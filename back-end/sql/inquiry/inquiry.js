const mysql = require("../../connection/mysqlConnection");

function inquiry(inquiry_type, inquiry_password, inquiry_contents){
    const sql = `INSERT INTO inquiry (inquiry_password, inquiry_type, inquiry_contents) VALUES (?, ?, ?)`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[inquiry_password, inquiry_type, inquiry_contents], (err, result) => {
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

function inquiryPassword(password){
    const sql = `select inquiry_password from inquiry where inquiry_password = ?`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[password], (err, result) => {
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
    
function inquiryList(password){
    const sql = `select * from inquiry where inquiry_password = ?`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[password], (err, result) => {
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

function deleteInquiryList(inquiry_id){
    const sql = `delete from inquiry where inquiry_id = ?`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[inquiry_id], (err, result) => {
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

function adminInquiryList(){
    const sql = `select * from inquiry`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql, (err, result) => {
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

module.exports = {inquiry, inquiryPassword, inquiryList, deleteInquiryList, adminInquiryList}