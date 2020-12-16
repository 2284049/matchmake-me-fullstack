// The users resource
require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const jwt = require("jsonwebtoken");
const selectAllUsers = require("../../queries/selectAllUsers");

// @route       POST api/v1/users
// @desc        Create a new user
// @access      Public
router.post("/", async (req, res) => {
   const { id, email, password, createdAt } = req.body;
   const emailError = await getSignUpEmailError(email);
   const passwordError = getSignUpPasswordError(password, email);
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      const hashedPassword = await toHash(password);
      const user = {
         id: id,
         username: "",
         first_name: "",
         last_name: "",
         email: email,
         phone_country_code: 0,
         phone_area_code: 0,
         phone_line_number: 0,
         phone_extension: null,
         birthdate: 0,
         password: hashedPassword,
         created_at: createdAt,
         verify_photo_url: "",
         // you can't post an array into a database
      };
      console.log(user);
      db.query(insertUser, user)
         .then(() => {
            db.query(selectUserById, id)
               .then((users) => {
                  const user = users[0];
                  res.status(200).json({
                     id: user.id,
                     username: user.username,
                     firstName: user.first_name,
                     lastName: user.last_name,
                     email: user.email,
                     phoneCountryCode: user.phone_country_code,
                     phoneAreaCode: user.phone_area_code,
                     phoneLineNumber: user.phone_line_number,
                     phoneExtension: user.phone_extension,
                     birthdate: user.birthdate,
                     password: user.password,
                     createdAt: user.created_at,
                     verifyPhotoUrl: user.verify_photo_url,
                     selectedAnswerIds: [],
                  });
               })
               .catch((err) => {
                  console.log(err);
                  dbError = `${err.code} ${err.sqlMessage}`;
                  res.status(400).json({ dbError });
               });
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

// @route       POST api/v1/users/auth
// @desc        Check this user against the db via email and password
// @access      Public
router.post("/auth", async (req, res) => {
   const { email, password } = req.body;
   const emailError = getLoginEmailError(email);
   const passwordError = await getLoginPasswordError(password, email);
   console.log({ emailError, passwordError });
   let dbError = "";
   if (emailError === "" && passwordError === "") {
      // return the user to the client
      db.query(selectUserByEmail, email)
         .then((users) => {
            // TODO: repeat when creating a user
            const user = {
               id: users[0].id,
               username: users[0].username,
               firstName: users[0].first_name,
               lastName: users[0].last_name,
               email: users[0].email,
               phoneCountryCode: users[0].phone_country_code,
               phoneAreaCode: users[0].phone_area_code,
               phoneLineNumber: users[0].phone_line_number,
               phoneExtension: users[0].phone_extension,
               birthdate: users[0].birthdate,
               password: users[0].password,
               createdAt: users[0].created_at,
               verifyPhotoUrl: users[0].verify_photo_url,
            };
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
               expiresIn: "100m",
            });
            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
            // options: expiresIn: Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
            // 60 = 60 seconds but "60" = 60 milliseconds
            res.status(200).json(accessToken);
         })
         .catch((err) => {
            console.log(err);
            dbError = `${err.code} ${err.sqlMessage}`;
            res.status(400).json({ dbError });
         });
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

// @route       GET api/v1/users
// @desc        Get user data
// @access      Public
router.get("/", (req, res) => {
   console.log(req.query);
   db.query(selectAllUsers)
      .then((users) => {
         const camelCasedUsers = users.map((user) => {
            // camelCasedUsers gives us an object for EVERY SELECTED ANSWER
            // so multiple objects for each user
            return {
               userId: user.user_id,
               username: user.username,
               firstName: user.first_name,
               lastName: user.last_name,
               email: user.email,
               phoneCountryCode: user.phone_country_code,
               phoneAreaCode: user.phone_area_code,
               phoneLineNumber: user.phone_line_number,
               phoneExtension: user.phone_extension,
               birthdate: user.birthdate,
               password: user.password,
               createdAt: user.created_at,
               verifyPhotoUrl: user.verify_photo_url,
               selectedAnswerId: user.selected_answer_id,
               selectedAnswerText: user.selected_answer_text,
            };
         });

         const unfinishedUsers = uniqBy(camelCasedUsers, "userId").map(
            (user) => {
               return {
                  userId: user.UserId,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phoneCountryCode: user.phoneCountryCode,
                  phoneAreaCode: user.phoneAreaCode,
                  phoneLineNumber: user.phoneLineNumber,
                  phoneExtension: user.phoneExtension,
                  birthdate: user.birthdate,
                  password: user.password,
                  createdAt: user.createdAt,
                  verifyPhotoUrl: user.verifyPhotoUrl,
                  questions: [],
               };
            }
         );
         // db.query(selectAllQuestionsAndAnswerChoices)
         //    .then((questions) => {
         //       const jsonParsedQuestions = toSafeParse(toJson(questions));
         //       const camelCasedQuestionsAndAnswers = jsonParsedQuestions.map(
         //          (jsonParsedQuestion) => {
         //             return {
         //                id: jsonParsedQuestion.question_id,
         //                title: jsonParsedQuestion.question_title,
         //                type: jsonParsedQuestion.question_type,
         //                limit: jsonParsedQuestion.question_limit,
         //                answers: [],
         //             };
         //          }
         //       );
         //       const uniqQuestions = uniqBy(
         //          camelCasedQuestionsAndAnswers,
         //          `id`
         //       );

         //       jsonParsedQuestions.forEach((jsonParsedQuestion) => {
         //          const uniqQuestions = uniqQuestions.find((uniqQuestion) => {
         //             return uniqueQuestion.id === jsonParsedQuestion.question_id;
         //          });
         //          uniqQuestion.answers = jsonParsedQuestion.answers.concat({
         //             id: jsonParsedQuestion.answer_id,
         //             text: jsonParsedQuestion.answer_text,
         //          });
         //       });
         //       console.log(uniqQuestions);
         //       res.json(uniqQuestions);
         //    })
         //    .catch((err) => {
         //       console.log(err);
         //       res.status(400).json(err);
         //    });
         console.log(camelCasedUsers);
         res.json(camelCasedUsers);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
