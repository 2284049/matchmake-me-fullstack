// The questions resource

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
         const questionsAndAnswers = toSafeParse(toJson(questions));
         const camelCasedQuestionsAndAnswers = questionsAndAnswers.map(
            (question) => {
               return {
                  id: question.question_id,
                  title: question.question_title,
                  type: question.question_type,
                  limit: question.question_limit,
                  answers: [],
                  selectedAnswerIds: [], // get from user query
               };
            }
         );
         const uniqQuestions = uniqBy(camelCasedQuestionsAndAnswers, `id`);

         questionsAndAnswers.forEach((questionAndAnswer) => {
            const question = uniqQuestions.find((question) => {
               return question.id === questionAndAnswer.question_id;
            });
            question.answers = question.answers.concat({
               id: questionAndAnswer.answer_id,
               text: questionAndAnswer.answer_text,
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
