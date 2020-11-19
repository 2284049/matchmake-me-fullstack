require("dotenv").config();
const mysql = require("mysql");
const selectUser = require("./queries/selectUser");
const { toJson, toSafeParse } = require("./utils/helpers");

const connection = mysql.createConnection({
   host: process.env.RDS_HOST,
   user: process.env.RDS_USER,
   password: process.env.RDS_PASSWORD,
   database: "matchmake_me_app",
});

connection.connect();

connection.query(
   selectUser("megan@gmail.com", "b3d4f347d71bc0d2a6af2cfc5fd81bb8"),
   (err, res) => {
      if (err) {
         console.log(err);
      } else {
         const users = toSafeParse(toJson(res));
         console.log(users);
      }
   }
);

connection.end();
