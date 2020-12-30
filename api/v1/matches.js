// The matches resource

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllUsers = require("../../queries/selectAllUsers");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/matches
// @desc        Get all matches to show on matches page
// @access      Public
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);

   //    const { userId, searchTerm, order } = req.query;
   //    let constructedSearchTerm;
   //    if (searchTerm === "" || searchTerm === undefined) {
   //       constructedSearchTerm = "%%";
   //    } else {
   //       constructedSearchTerm = `%${searchTerm}%`;
   //    }
   //    /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllUsers)
      .then((matches) => {
         const camelCasedMatches = matches.map((match) => {
            return {
               id: match.id,
               username: match.username,
               firstName: match.first_name,
               lastName: match.last_name,
               email: match.email,
               phoneCountryCode: match.phone_country_code,
               phoneAreaCode: match.phone_area_code,
               phoneLineNumber: match.phone_line_number,
               phoneExtension: match.phone_extension,
               birthdate: match.birthdate,
               password: match.password,
               createdAt: match.created_at,
               verifyPhotoUrl: match.verify_photo_url,
            };
         });
         console.log(camelCasedMatches);
         res.json(camelCasedMatches);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
