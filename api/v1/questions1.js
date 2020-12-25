// The questions resource OPTION 1 w/map & filter

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllQuestionsAndAnswerChoices = require("../../queries/selectAllQuestionsAndAnswerChoices");
const uniqBy = require("lodash/uniqBy");
const { toJson, toSafeParse } = require("../../utils/helpers");

// @route       GET api/v1/questions
// @desc        Get all questions and answer choices to show on questionnaire page
// @access      Public
router.get("/", (req, res) => {
   console.log(req.query);
   db.query(selectAllQuestionsAndAnswerChoices)
      .then((questions) => {
         const camelCasedQuestionsAndAnswers = questions.map(
            (camelCasedQuestion) => {
               return {
                  // the query results we will be using - give them camel case names:
                  questionId: camelCasedQuestion.question_id,
                  questionTitle: camelCasedQuestion.question_title,
                  questionType: camelCasedQuestion.question_type,
                  questionLimit: camelCasedQuestion.question_limit,
                  answerId: camelCasedQuestion.answer_id,
                  answerText: camelCasedQuestion.answer_text,
               };
               // camelCasedQuestionsAndAnswers gives us an object for EVERY SELECTED ANSWER
               // so multiple objects for each question
               // we want ONE object for every unique question (will do below)
            }
         );
         const questionsWithoutAnswers = uniqBy(
            camelCasedQuestionsAndAnswers,
            `questionId`
         ).map((questionWithoutAnswers) => {
            return {
               questionId: questionWithoutAnswers.questionId,
               questionTitle: questionWithoutAnswers.questionTitle,
               questionType: questionWithoutAnswers.questionType,
               questionLimit: questionWithoutAnswers.questionLimit,
               answerChoices: [],
            };
            // now we have ONE object for every unique question
            // we still need to add our answer choices for each question (will do below)
         });
         const questionsWithAnswers = questionsWithoutAnswers.map(
            (questionWithoutAnswers) => {
               const questionAnswers = camelCasedQuestionsAndAnswers
                  .filter((camelCasedQuestion) => {
                     // we need to go back to our original array up top to get all the answers from all those objects
                     // and match the question id from that those camel cased objects with
                     // the question id from questions without answers array
                     return (
                        camelCasedQuestion.questionId ===
                        questionWithoutAnswers.questionId
                     );
                  }) // filter done here
                  // now we need to properties for each answer choice
                  .map((questionAnswer) => {
                     return {
                        answerId: questionAnswer.answerId,
                        answerText: questionAnswer.answerText,
                     };
                  });
               return {
                  ...questionWithoutAnswers,
                  answerChoices: questionAnswers,
               };
            }
         );
         console.log(questionsWithAnswers);
         res.json(questionsWithAnswers);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
