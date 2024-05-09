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
    const sql = `select * from inquiry where inquiry_password = ? order by register_date desc`;
   
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
    const sql = `select * from inquiry order by register_date desc`;
   
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

function answerInquiryList(inquiry_answer, inquiry_id){
    const sql = `update inquiry set inquiry_answer_date = now(), inquiry_answer = ? where inquiry_id = ?`;
   
    return new Promise((resolve, reject) => {
        mysql.query(sql,[inquiry_answer, inquiry_id],(err, result) => {
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

module.exports = {inquiry, inquiryPassword, inquiryList, deleteInquiryList, adminInquiryList, answerInquiryList}