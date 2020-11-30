// an array of all the current user's matches. Each object is a "match."
const schemaOfMatches = [
  {
    id: String, // UUID of the user that is a match
    score: Number, // a number 0 to 100 of how well they matched the current user
    createdAt: Number, // milliseconds since the epoch
    verifyPhotoUrl: String, // use the actual URL for the photos you found!
    questions: [
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
        selectedAnswerIds: [String], // an array of UUIDs indicating all selected answers. can be one or none, too.
      },
    ],
  },
];
