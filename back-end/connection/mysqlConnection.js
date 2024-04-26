const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// 데이터베이스 연결 정보
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
});

// 데이터베이스 연결
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

module.exports = connection;
