// The questions resource OPTION 2 w/forEach, find, & concat

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

   //    const { userId, searchTerm, order } = req.query;
   //    let constructedSearchTerm;
   //    if (searchTerm === "" || searchTerm === undefined) {
   //       constructedSearchTerm = "%%";
   //    } else {
   //       constructedSearchTerm = `%${searchTerm}%`;
   //    }
   //    /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllQuestionsAndAnswerChoices)
      .then((questions) => {
         const jsonParsedQuestions = toSafeParse(toJson(questions));
         // jsonParsedQuestions = ALL QUERY RESULTS
         // Multiple objects for each question; one object for every answer choice
         const camelCasedQuestionsAndAnswers = jsonParsedQuestions.map(
            (jsonParsedQuestion) => {
               return {
                  id: jsonParsedQuestion.question_id,
                  title: jsonParsedQuestion.question_title,
                  type: jsonParsedQuestion.question_type,
                  limit: jsonParsedQuestion.question_limit,
                  answers: [],
               };
            }
         );
         const uniqQuestions = uniqBy(camelCasedQuestionsAndAnswers, `id`);
         // Now we don't have any questions repeating,
         // and only have ONE object for each question
         // but we lost all of our answer choices

         // GET OUR ANSWER CHOICES
         jsonParsedQuestions.forEach((jsonParsedQuestion) => {
            // First, we are
            const question = uniqQuestions.find((uniqQuestion) => {
               return uniqQuestion.id === jsonParsedQuestion.question_id;
            });
            question.answers = question.answers.concat({
               id: jsonParsedQuestion.answer_id,
               text: jsonParsedQuestion.answer_text,
            });
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
