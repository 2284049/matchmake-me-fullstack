// TO DO: WHEN USER LOGS IN - GET THEIR DATA AND PUT IN REDUX GLOBAL STORE

// The users resource
require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../../db");
const insertUser = require("../../queries/insertUser");
// const selectUserById = require("../../queries/selectUserById");
const selectUserByEmail = require("../../queries/selectUserByEmail");
const { toHash } = require("../../utils/helpers");
const getSignUpEmailError = require("../../validation/getSignUpEmailError");
const getSignUpPasswordError = require("../../validation/getSignUpPasswordError");
const getLoginEmailError = require("../../validation/getLoginEmailError");
const getLoginPasswordError = require("../../validation/getLoginPasswordError");
const jwt = require("jsonwebtoken");
const selectAllUsers = require("../../queries/selectAllUsers");
const selectAllQuestionsAndAnswerChoices = require("../../queries/selectAllQuestionsAndAnswerChoices");
const uniqBy = require("lodash/uniqBy");
const validateJwt = require("../../utils/validateJwt");

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
      };
      // you can't post an array into a database

      // console.log(user);
      db.query(insertUser, user)
         .then(async () => {
            let currentUser = await getUserData(selectUserByEmail, email);
            let user = currentUser[0];
            const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
               expiresIn: "100m",
            });
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
      let currentUser = await getUserData(selectUserByEmail, email);
      let user = currentUser[0];
      const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
         expiresIn: "100m",
      });
      res.status(200).json(accessToken);
   } else {
      res.status(400).json({
         emailError: emailError,
         passwordError: passwordError,
      });
   }
});

// jwt.sign(payload, secretOrPrivateKey, [options, callback])
// options: expiresIn: Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
// 60 = 60 seconds but "60" = 60 milliseconds

//          .catch((err) => {
//             console.log(err);
//             dbError = `${err.code} ${err.sqlMessage}`;
//             res.status(400).json({ dbError });
//          });
//
// });

// @route       POST api/v1/users/currentUser
// @desc        Get data for current logged in user
// @access      Public
router.post("/currentUser", async (req, res) => {
   console.log("I'm in the current user api");
   const email = req.body.email;
   console.log(email);
   let currentUser = await getUserData(selectUserByEmail, email);
   let user = currentUser[0];
   console.log("This is the user: ", user);
   res.status(200).json(user);
});

// @route       GET api/v1/users
// @desc        Get data for all users
// @access      Public
router.get("/", async (req, res) => {
   let userData = await getUserData(selectAllUsers, "");
   res.status(200).json(userData);
});

// // @route       GET api/v1/currentUser
// // @desc        Get data for all users
// // @access      Public
// router.get("/currentUser", validateJwt, async (req, res) => {
//    console.log("Here is the request body: ", req.body);
//    const email = req.user.email;
//    console.log("Here's the user email in the router: ", email);
//    let userData = await getUserData(selectUserByEmail, email);
//    res.json(userData);
// });

// FUNCTION TO GET ALL DATA, INCLUDING NESTED DATA FOR A USER/USERS
async function getUserData(selectedQuery, email) {
   let queriedUsers = await db
      .query(selectedQuery, email)
      .then((queriedUsers) => {
         const camelCasedUsers = queriedUsers.map((queriedUser) => {
            // camelCasedUsers gives us an object for EVERY SELECTED ANSWER
            // so multiple objects for each user
            return {
               userId: queriedUser.user_id,
               username: queriedUser.username,
               firstName: queriedUser.first_name,
               lastName: queriedUser.last_name,
               email: queriedUser.email,
               phoneCountryCode: queriedUser.phone_country_code,
               phoneAreaCode: queriedUser.phone_area_code,
               phoneLineNumber: queriedUser.phone_line_number,
               phoneExtension: queriedUser.phone_extension,
               birthdate: queriedUser.birthdate,
               createdAt: queriedUser.created_at,
               verifyPhotoUrl: queriedUser.verify_photo_url,
               questionId: queriedUser.question_id,
               selectedAnswerId: queriedUser.selected_answer_id,
               selectedAnswerText: queriedUser.selected_answer_text,
            };
         });
         // console.log("Here are camel cased users: ", camelCasedUsers);
         // res.json(camelCasedUsers);
         return camelCasedUsers;
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
   // console.log("Here are queriedUsers: ", queriedUsers);

   let queriedQuestions = await db
      .query(selectAllQuestionsAndAnswerChoices)
      .then((queriedQuestions) => {
         const camelCasedQuestions = queriedQuestions.map((queriedQuestion) => {
            return {
               questionId: queriedQuestion.question_id,
               questionTitle: queriedQuestion.question_title,
               questionType: queriedQuestion.question_type,
               questionLimit: queriedQuestion.question_limit,
               answerChoiceId: queriedQuestion.answer_id,
               answerChoiceText: queriedQuestion.answer_text,
            };
         });
         // console.log(
         //    "Here are the camel cased questions: ",
         //    camelCasedQuestions
         // );
         // res.json(camelCasedQuestions);
         return camelCasedQuestions;
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
   // console.log("Here are queriedQuestions: ", queriedQuestions);

   const formattedUsers = queriedUsers.map((queriedUser) => {
      return {
         userId: queriedUser.userId,
         username: queriedUser.username,
         firstName: queriedUser.firstName,
         lastName: queriedUser.lastName,
         email: queriedUser.email,
         phoneCountryCode: queriedUser.phoneCountryCode,
         phoneAreaCode: queriedUser.phoneAreaCode,
         phoneLineNumber: queriedUser.phoneLineNumber,
         phoneExtension: queriedUser.phoneExtension,
         birthdate: queriedUser.birthdate,
         password: queriedUser.password,
         createdAt: queriedUser.createdAt,
         verifyPhotoUrl: queriedUser.verifyPhotoUrl,
         questions: uniqBy(queriedQuestions, `questionId`).map(
            (uniqQuestion) => {
               return {
                  questionId: uniqQuestion.questionId,
                  questionTitle: uniqQuestion.questionTitle,
                  questionType: uniqQuestion.questionType,
                  questionLimit: uniqQuestion.questionLimit,
                  answerChoices: queriedQuestions
                     .map((queriedQuestion) => {
                        return {
                           answerChoiceText: queriedQuestion.answerChoiceText,
                           answerChoiceId: queriedQuestion.answerChoiceId,
                           questionId: queriedQuestion.questionId,
                           // put every single answer choice for all questions under one question
                           // add questionId temporarily to filter by it
                        };
                     })
                     .filter((answerChoice) => {
                        return (
                           uniqQuestion.questionId === answerChoice.questionId
                        );
                     })
                     .map((answerChoice) => {
                        delete answerChoice.questionId;
                        return answerChoice;
                     }), // can just put answerChoices, since they're the same
                  selectedAnswerIds: queriedUsers
                     .map((queriedUserForAnswers) => {
                        // we want every selected answer from every single user
                        // for the question id
                        return {
                           selectedAnswerId:
                              queriedUserForAnswers.selectedAnswerId,
                           userId: queriedUserForAnswers.userId,
                           questionId: queriedUserForAnswers.questionId,
                        };
                     })
                     .filter((selectedAnswer) => {
                        return (
                           selectedAnswer.questionId ===
                              uniqQuestion.questionId &&
                           selectedAnswer.userId === queriedUser.userId
                        );
                     })
                     .map((selectedAnswer) => {
                        return selectedAnswer.selectedAnswerId;
                     }),
               };
            }
         ),
      };
   });

   const uniqUsers = uniqBy(formattedUsers, `userId`);
   return uniqUsers;
}

module.exports = router;
