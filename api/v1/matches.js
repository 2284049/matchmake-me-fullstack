// The matches resource (matches are users with a completed questionnaire)

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllUsers = require("../../queries/selectAllUsers");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/matches
// @desc        Get all matches (users who completed questionnaire)
// @access      Private
router.get("/", async (req, res) => {
   let dbMatches = await db
      .query(selectAllUsers)
      .then((dbMatches) => {
         const camelCasedMatches = dbMatches.map((dbMatch) => {
            // camelCasedMatches gives us an object for EVERY SELECTED ANSWER
            // so multiple objects for each user
            return {
               userId: dbMatch.user_id,
               username: dbMatch.username,
               firstName: dbMatch.first_name,
               lastName: dbMatch.last_name,
               email: dbMatch.email,
               phoneCountryCode: dbMatch.phone_country_code,
               phoneAreaCode: dbMatch.phone_area_code,
               phoneLineNumber: dbMatch.phone_line_number,
               phoneExtension: dbMatch.phone_extension,
               birthdate: dbMatch.birthdate,
               password: dbMatch.password,
               createdAt: dbMatch.created_at,
               verifyPhotoUrl: dbMatch.verify_photo_url,
               questionId: dbMatch.question_id,
               selectedAnswerId: dbMatch.selected_answer_id,
               selectedAnswerText: dbMatch.selected_answer_text,
               selectedAnswerPosition: dbMatch.selected_answer_position,
            };
         });
         // console.log("Here are camel cased users: ", camelCasedMatches);
         // res.json(camelCasedMatches);
         return camelCasedMatches;
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
   // console.log("Here are dbMatches: ", dbMatches);

   let dbQuestions = await db
      .query(selectAllQuestionsAndAnswerChoices)
      .then((dbQuestions) => {
         const camelCasedQuestions = dbQuestions.map((dbQuestion) => {
            return {
               questionId: dbQuestion.question_id,
               questionTitle: dbQuestion.question_title,
               questionType: dbQuestion.question_type,
               questionLimit: dbQuestion.question_limit,
               answerChoiceId: dbQuestion.answer_id,
               answerChoiceText: dbQuestion.answer_text,
               answerChoicePosition: dbQuestion.answer_position,
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
   // console.log("Here are dbQuestions: ", dbQuestions);

   const formattedMatches = dbMatches.map((dbMatch) => {
      return {
         userId: dbMatch.userId,
         username: dbMatch.username,
         firstName: dbMatch.firstName,
         lastName: dbMatch.lastName,
         email: dbMatch.email,
         phoneCountryCode: dbMatch.phoneCountryCode,
         phoneAreaCode: dbMatch.phoneAreaCode,
         phoneLineNumber: dbMatch.phoneLineNumber,
         phoneExtension: dbMatch.phoneExtension,
         birthdate: dbMatch.birthdate,
         password: dbMatch.password,
         createdAt: dbMatch.createdAt,
         verifyPhotoUrl: dbMatch.verifyPhotoUrl,
         questions: uniqBy(dbQuestions, `questionId`).map((uniqQuestion) => {
            return {
               questionId: uniqQuestion.questionId,
               questionTitle: uniqQuestion.questionTitle,
               questionType: uniqQuestion.questionType,
               questionLimit: uniqQuestion.questionLimit,
               answerChoices: dbQuestions
                  .map((dbQuestion) => {
                     return {
                        answerChoiceText: dbQuestion.answerChoiceText,
                        answerChoiceId: dbQuestion.answerChoiceId,
                        questionId: dbQuestion.questionId,
                        // put every single answer choice for all questions under one question
                        // add questionId temporarily to filter by it
                     };
                  })
                  .filter((answerChoice) => {
                     return uniqQuestion.questionId === answerChoice.questionId;
                  })
                  .map((answerChoice) => {
                     delete answerChoice.questionId;
                     return answerChoice;
                  }), // can just put answerChoices, since they're the same
               selectedAnswerIds: dbMatches
                  .map((dbMatchForAnswers) => {
                     // we want every selected answer from every single user
                     // for the question id
                     return {
                        selectedAnswerId: dbMatchForAnswers.selectedAnswerId,
                        userId: dbMatchForAnswers.userId,
                        questionId: dbMatchForAnswers.questionId,
                     };
                  })
                  .filter((selectedAnswer) => {
                     return (
                        selectedAnswer.questionId === uniqQuestion.questionId &&
                        selectedAnswer.userId === dbMatch.userId
                     );
                  })
                  .map((selectedAnswer) => {
                     return selectedAnswer.selectedAnswerId;
                  }),
            };
         }),
      };
   });

   const uniqMatches = uniqBy(formattedMatches, `userId`);

   res.json(uniqMatches);
});

module.exports = router;
