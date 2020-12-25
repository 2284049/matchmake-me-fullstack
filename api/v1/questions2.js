// The questions resource OPTION 2 w/forEach, find, & concat

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllQuestionsAndAnswerChoices = require("../../queries/selectAllQuestionsAndAnswerChoices");
const uniqBy = require("lodash/uniqBy");

// @route       GET api/v1/questions
// @desc        Get all questions and answer choices to show on questionnaire page
// @access      Public
router.get("/", (req, res) => {
   console.log(req.query);
   db.query(selectAllQuestionsAndAnswerChoices)
      .then((queriedQuestions) => {
         // queriedQuestions = ALL QUERY RESULTS
         // Multiple objects for each question; one object for every answer choice
         const camelCasedQuestions = queriedQuestions.map((queriedQuestion) => {
            return {
               questionId: queriedQuestion.question_id,
               questionTitle: queriedQuestion.question_title,
               questionType: queriedQuestion.question_type,
               questionLimit: queriedQuestion.question_limit,
               answerChoices: [],
            };
         });
         // GET ONE OBJECT FOR EACH UNIQUE QUESTION (BY ID)
         const uniqQuestions = uniqBy(camelCasedQuestions, `questionId`);
         // Now we don't have any questions repeating,
         // and only have ONE object for each question
         // but we lost all of our answer choices

         // GET OUR ANSWER CHOICES
         queriedQuestions.forEach((queriedQuestion) => {
            // We are getting our original array of results,
            // where there were multiple objects for each question
            // there was an object for every answer choice
            // we are going to go through all those objects and for each one,
            // we are going to find all the objects from this huge queried questions array
            // that have a question id that matches our unique question id,
            // and if they match, we will add the answer of that object (both the answerId and answerText
            // from the queriedQuestion to the answerChoices array of the unique question
            const matchedQuestions = uniqQuestions.find((uniqQuestion) => {
               return uniqQuestion.questionId === queriedQuestion.question_id;
            });
            matchedQuestions.answerChoices = matchedQuestions.answerChoices.concat(
               {
                  answerId: queriedQuestion.answer_id,
                  answerText: queriedQuestion.answer_text,
               }
            );
         });
         console.log(uniqQuestions);
         res.json(uniqQuestions);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
