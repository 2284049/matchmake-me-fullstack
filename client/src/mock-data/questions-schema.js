// the form which is just a list of questions
const schemaOfQuestions = [
  // an array of all the questions
  {
    id: String, // UUID
    title: String,
    type: Number, // 1 for radios, 2 for checkboxes
    limit: Number, // a limit on how many options they can select - only works with checkboxes. 0 is unlimited.
    answers: [
      {
        id: String, // UUID
        text: String,
      },
    ],
  },
];
