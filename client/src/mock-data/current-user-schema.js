// the data for the current user
const schemaOfCurrentUser = {
  id: String, // UUID
  firstName: String,
  lastName: String,
  email: String,
  phone: {
    // collecting and storing phone numbers is a pain! :)
    countryCode: Number, // can be up to 7 digits
    areaCode: Number, // can be up to 7 digits
    lineNumber: Number, // can be up to 15 digits
    extension: Number, // can be up to 20 digits
  },
  password: String, // hash
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
};
