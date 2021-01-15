// The userAnswers resource

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllUserAnswers = require("../../queries/selectAllUserAnswers");
const deleteUserAnswer = require("../../queries/deleteUserAnswer");

const insertUserAnswer = require("../../queries/insertUserAnswer");
// const updateUserAnswer = require("../../queries/updateMemoryCard");
const validateJwt = require("../../utils/validateJwt");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route      POST api/v1/user-answers
// @desc       create a new answer
// @access     Private
router.post("/", validateJwt, (req, res) => {
   const userAnswer = {
      id: req.body.userAnswerId,
      user_id: req.body.userId, // req.user is part of validateJwt; that is where we defined req.user
      answer_id: req.body.answerId,
   };
   console.log("here's the answer: ", userAnswer);
   db.query(insertUserAnswer, userAnswer)
      .then((dbRes) => {
         // success
         // console.log("Created user answer in the db: ", dbRes);
         return res.status(200).json({ success: "User answer created" }); // return with a status
      })
      .catch((err) => {
         console.log(err);
         const dbError = `${err.code} ${err.sqlMessage}`;
         res.status(400).json({ dbError });
      });
});

// @route       GET api/v1/user-answers
// @desc        Get all answers for a user
// @access      Private
router.get("/", validateJwt, (req, res) => {
   // console.log("I am in the get user answers route.");
   const userId = req.user.userId;
   // console.log(req.user);
   // console.log(userId);
   db.query(selectAllUserAnswers, userId)
      // in selectUserAnswers query, we have 1 question mark
      // in the parameters above, we are defining the question mark in the query as "userId"
      // using this “prepared statement” syntax with escaping query values helps with security
      /* https://www.npmjs.com/package/mysql#escaping-query-values */
      .then((userAnswersInDb) => {
         const camelCasedUserAnswersInDb = userAnswersInDb.map(
            (userAnswerInDb) => {
               return {
                  userAnswerId: userAnswerInDb.id,
                  userId: userAnswerInDb.user_id,
                  answerId: userAnswerInDb.answer_id,
               };
            }
         );
         // console.log(toSafeParse(toJson(camelCasedUserAnswersInDb)));
         return res
            .status(200)
            .json(toSafeParse(toJson(camelCasedUserAnswersInDb)));
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

// // @route       PUT api/v1/memory-cards/:id
// // @desc        Update a memory card in the memory cards resource
// // @access      Private
// router.put("/:id", validateJwt, (req, res) => {
//    const id = req.params.id; // memory card id from URL
//    // params is part of EXPRESS, it gives you anything after the slash in URL
//    // console.log("memory card id: ", id);
//    // We need to build the memory card object to put it into the db:
//    const {
//       imagery,
//       answer,
//       createdAt,
//       nextAttemptAt,
//       lastAttemptAt,
//       totalSuccessfulAttempts,
//       level,
//    } = req.body;
//    const memoryCard = {
//       id,
//       imagery,
//       answer,
//       user_id: req.user.id, // req.user is part of validateJwt; that is where we defined req.user
//       created_at: createdAt,
//       next_attempt_at: nextAttemptAt,
//       last_attempt_at: lastAttemptAt,
//       total_successful_attempts: totalSuccessfulAttempts,
//       level,
//    };
//    console.log("Here's the updated memory card: ", memoryCard);
//    db.query(updateMemoryCard, [memoryCard, memoryCard.id]) // in the insertMemoryCard function, the ? = memoryCard
//       .then((dbRes) => {
//          // success
//          console.log("Updated memory card in the db: ", dbRes);
//          return res.status(200).json({ success: "Card updated" }); // return with a status
//       })
//       .catch((err) => {
//          console.log(err);
//          const dbError = `${err.code} ${err.sqlMessage}`;
//          res.status(400).json({ dbError });
//       });
// });

// @route       DELETE api/v1/user-answers/:answerId
// @desc        Delete a user answer from the user-answers resource
// @access      Private
router.delete("/:id", validateJwt, (req, res) => {
   console.log("I'm in the delete route");
   const id = req.params.id;
   console.log("Here's the delete item id: ", id);
   db.query(deleteUserAnswer, id)
      .then(() => {
         return res.status(200).json({ success: "answer deleted" }); // return with a status
      })
      .catch((err) => {
         console.log(err);
         const dbError = `${err.code} ${err.sqlMessage}`;
         res.status(500).json({ dbError });
      });
});

module.exports = router;
