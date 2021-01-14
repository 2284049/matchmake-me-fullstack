const selectAllUserAnswers = `
SELECT
    *
FROM
    xref_user_answers
WHERE
    user_id = ?;
`;

module.exports = selectAllUserAnswers;
