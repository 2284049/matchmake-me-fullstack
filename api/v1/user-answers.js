// The userAnswers resource

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllUserAnswers = require("../../queries/selectAllUserAnswers");
const insertUserAnswer = require("../../queries/insertUserAnswer");
// const updateUserAnswer = require("../../queries/updateMemoryCard");
const validateJwt = require("../../utils/validateJwt");

// // @route POST api/v1/answers
// // @desc  create a new answer
// // @access      Private

// router.post("/", validateJwt, (req, res) => {
//    const userAnswer = {
//       id: req.body.id,
//       user_id: req.user.id, // req.user is part of validateJwt; that is where we defined req.user
//       answer_id: req.body.answerId,
//    };
//    console.log("here's the answer: ", userAnswer);
//    db.query(insertUserAnswer, userAnswer)
//       .then((dbRes) => {
//          // success
//          console.log("Created user answer in the db: ", dbRes);
//          return res.status(200).json({ success: "User answer created" }); // return with a status
//       })
//       .catch((err) => {
//          console.log(err);
//          const dbError = `${err.code} ${err.sqlMessage}`;
//          res.status(400).json({ dbError });
//       });
// });

// @route       GET api/v1/user-answers
// @desc        Get all memory cards for a user by search term and order
// @access      Private
router.get("/", validateJwt, (req, res) => {
   const userId = req.user.id;
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
         console.log(camelCasedUserAnswersInDb);
         return res.status(200).json(camelCasedUserAnswersInDb);
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

// // @route       DELETE api/v1/memory-cards/:id
// // @desc        Delete a memory card in the memory cards resource
// // @access      Private
// router.delete("/:id", validateJwt, (req, res) => {
//    const id = req.params.id; // memory card id from URL
//    db.query(deleteMemoryCardById, id)
//       .then(() => {
//          return res.status(200).json({ success: "Card deleted" }); // return with a status
//       })
//       .catch((err) => {
//          console.log(err);
//          const dbError = `${err.code} ${err.sqlMessage}`;
//          res.status(500).json({ dbError });
//       });
// });

// module.exports = router;
