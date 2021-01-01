const selectAllMatches = ` 
SELECT 
    users.id AS user_id,
    users.username,
    users.first_name,
    users.last_name,
    users.email,
    users.phone_country_code,
    users.phone_area_code,
    users.phone_line_number,
    users.phone_extension,
    users.birthdate,
    users.password,
    users.created_at,
    users.verify_photo_url,
    questions.id AS question_id,
    questions.title AS question_title,
    questions.type AS question_type,
    questions.limit AS question_limit,
    xref_user_answers.answer_id AS selected_answer_id,
    answers.text AS selected_answer_text
FROM
    users
        LEFT JOIN
    xref_user_answers ON user_id = users.id
        INNER JOIN
    answers ON answers.id = xref_user_answers.answer_id
        INNER JOIN
    questions ON questions.id = answers.question_id
`;
module.exports = selectAllMatches;
