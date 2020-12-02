// The users resource

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectUser = require("../../queries/selectUser");
const selectAllUsers = require("../../queries/selectAllUsers");

const { toJson, toSafeParse } = require("../../utils/helpers");

// @route       GET api/v1/users
// @desc        Get a valid user via email & password
// @access      Public
router.get("/", (req, res) => {
   console.log(req.query);
   db.query(selectUser("megan@gmail.com", "b3d4f347d71bc0d2a6af2cfc5fd81bb8"))
      .then((dbRes) => {
         const users = toSafeParse(toJson(dbRes));
         console.log(users);
         res.json(users);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;