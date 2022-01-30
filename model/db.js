"user strict";
const mysql = require("mysql"); // เรียกใช้งาน MySQL module

// กำหนดการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "calendar",
});

// ทำการเชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    // กรณีเกิด error
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
