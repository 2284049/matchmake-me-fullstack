const deleteUserAnswer = `
    DELETE FROM
        xref_user_answers
    WHERE
        id = ?;
    `;

module.exports = deleteUserAnswer;
