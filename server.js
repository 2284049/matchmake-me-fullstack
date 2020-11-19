require("dotenv").config();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "white_bear_app",
});

connection.connect();

connection.query(selectUser("sarah@gmail.com", "replace_me"), (err, res) => {
   if (err) {
      console.log(err);
   } else {
      const users = toSafeParse(toJson(res));
      console.log(users);
   }
});

connection.end();
