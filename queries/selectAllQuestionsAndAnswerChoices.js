const selectAllQuestionsAndAnswerChoices = `
    SELECT
	    questions.id AS question_id,
	    questions.title AS question_title,
	    questions.type AS question_type,
	    questions.limit AS question_limit,
        answers.id AS answer_id,
        answers.text AS answer_text
    FROM
	    questions
		    INNER JOIN
        answers ON questions.id = answers.question_id
    `;

module.exports = selectAllQuestionsAndAnswerChoices;
