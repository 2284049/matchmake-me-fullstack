require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

const db = mysql.createPool({
   connectionLimit: 10,
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "matchmake_me_app",
});

// Allows you to do promises in Node.js with mySQL
db.query = nodeUtil.promisify(db.query);

module.exports = db;
