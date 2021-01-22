// // The matches resource (matches are users with a completed questionnaire)

// The users resource
require("dotenv").config();

const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllUsers = require("../../queries/selectAllUsers");
const selectAllQuestionsAndAnswerChoices = require("../../queries/selectAllQuestionsAndAnswerChoices");
const uniqBy = require("lodash/uniqBy");
const validateJwt = require("../../utils/validateJwt");
const orderBy = require("lodash/orderBy");

// @route       GET api/v1/matches
// @desc        Get data for all matches with their match score
// @access      Private
router.get("/", validateJwt, async (req, res) => {
   let users = await getUserData(selectAllUsers, "");
   const userIdFromValidateJwt = req.user.userId;
   let currentUser = users.filter((user) => {
      return user.userId === userIdFromValidateJwt;
   });
   currentUser = currentUser[0];
   const matches = users.filter((user) => {
      return user.userId !== userIdFromValidateJwt;
   });
   const matchesWithStartingScore = matches.map((match) => {
      match.score = 0;
   });
   const scoresForAllMatches = matches.map((match) => {
      const matchScores = match.questions.map((matchQuestion) => {
         if (matchQuestion.selectedAnswerIds.length === 0) {
         } else if (matchQuestion.questionType === 3) {
            console.log("Match first name: ", match.firstName);
            console.log("Match question id: ", matchQuestion.questionId);
            const matchMatchingAnswerChoice = matchQuestion.answerChoices.filter(
               (matchAnswerChoice) => {
                  return (
                     matchAnswerChoice.answerChoiceId ===
                     matchQuestion.selectedAnswerIds[0]
                  );
               }
            ); // done with filter, have matchingAnswerChoice, need position
            const matchAnswerPosition =
               matchMatchingAnswerChoice[0].answerChoicePosition;
            console.log("Match answer position: ", matchAnswerPosition);
            const sameQuestionForCurrentUser = currentUser.questions.filter(
               (currentUserQuestion) => {
                  return (
                     currentUserQuestion.questionId === matchQuestion.questionId
                  );
               }
            );
            console.log("Current user first name: ", currentUser.firstName);

            console.log(
               "Current user question id: ",
               sameQuestionForCurrentUser[0].questionId
            );

            const currentUserMatchingAnswerChoice = sameQuestionForCurrentUser[0].answerChoices.filter(
               (currentUserAnswerChoice) => {
                  return (
                     currentUserAnswerChoice.answerChoiceId ===
                     sameQuestionForCurrentUser[0].selectedAnswerIds[0]
                  );
               }
            );
            const currentUserAnswerPosition =
               currentUserMatchingAnswerChoice[0].answerChoicePosition;
            console.log(
               "Current user answer position: ",
               currentUserAnswerPosition
            );
            let matchQuestionScore = match.score; // adding score property
            console.log("initial match question score: ", matchQuestionScore);
            if (currentUserAnswerPosition === matchAnswerPosition) {
               updatedMatchScore = matchQuestionScore + 10;
               console.log("Adding 10 to score");
            } else if (
               (currentUserAnswerPosition === 1 && matchAnswerPosition === 4) ||
               (currentUserAnswerPosition === 4 && matchAnswerPosition === 1)
            ) {
               updatedMatchScore = matchQuestionScore - 10;
               console.log("subtracting 10 to score");
            } else if (
               (currentUserAnswerPosition === 1 && matchAnswerPosition === 2) ||
               (currentUserAnswerPosition === 2 && matchAnswerPosition === 1) ||
               matchAnswerPosition === 3 ||
               (currentUserAnswerPosition === 3 && matchAnswerPosition === 2) ||
               matchAnswerPosition === 4 ||
               (currentUserAnswerPosition === 4 && matchAnswerPosition === 3)
            ) {
               updatedMatchScore = matchQuestionScore + 5;
               console.log("subtracting 10 to score");
            }
            match.score = updatedMatchScore;
            console.log("updated match score property: ", match.score);
            return matchAnswerPosition;
         }
         if (matchQuestion.questionType === 2) {
         }
         if (matchQuestion.questionType === 1) {
         }
      });
   });
   res.status(200).json(matches);
});
//   const currentUserAnswerPositions = currentUser.questions.map(
//      (currentUserQuestion) => {
//         if (currentUserQuestion.questionType === 3) {
//            const currentUserMatchingAnswerChoice = currentUserQuestion.answerChoices.filter(
//               (userAnswerChoice) => {
//                  return (
//                     userAnswerChoice.answerChoiceId ===
//                     currentUserQuestion.selectedAnswerIds[0]
//                  );
//               }
//            ); // done with filter, have matchingAnswerChoice, need position
//            const currentUserAnswerPosition =
//               currentUserMatchingAnswerChoice[0].answerChoicePosition;

//            return currentUserAnswerPosition;
//         }
//         if (currentUserQuestion.questionType === 2) {
//         }
//         if (currentUserQuestion.questionType === 1) {
//         }
//      }
//   );
//       });
//    });
//    console.log("match score: ", matchScores);

// map through each match
// map through each of match's questions
// get the selected answer choice position for that question
// get the current user's selected answer choice position for that question

//           const matchesWithMatchScores = users.map((match) => {
//              if (!match.userId === this.props.currentUser.userId) {
//                 // get all mathches (users other than current user)
//                 const sameQuestion = match.questions.filter(
//                    (matchQuestion) => {
//                       return (
//                          matchQuestion.questionId ===
//                          currentUserQuestion.questionId
//                          // filter the match questions for the one that matches the current user question that's currently being mapped
//                       );
//                    }
//                 );
//                 const matchAnswerPosition = sameQuestion.answerChoices.filter(
//                    (matchAnswerChoice) => {
//                       if (
//                          matchAnswerChoice.answerId ===
//                          sameQuestion.selectedAnswerId
//                       ) {
//                          return matchAnswerChoice.AnswerChoicePosition;
//                          // now we have the position of the match's selected answer for this question
//                       }
//                    }
//                 );
//                 let matchScore = 0; // adding score property
//                 if (currentUserAnswerPosition === matchAnswerPosition) {
//                    matchScore = matchScore + 10;
//                 } else if (
//                    (currentUserAnswerPosition === 1 &&
//                       matchAnswerPosition === 4) ||
//                    (currentUserAnswerPosition === 4 &&
//                       matchAnswerPosition === 1)
//                 ) {
//                    matchScore = matchScore - 10;
//                 }
//                 match.score = matchScore;
//                 return user;
//              }
//           });
//           console.log(
//              "Here are the matches with match scores: ",
//              matchesWithMatchScores
//           );

// FUNCTION TO GET ALL DATA, INCLUDING NESTED DATA FOR A USER/USERS
async function getUserData(selectedQuery, email) {
   let queriedUsers = await db
      .query(selectedQuery, email)
      .then((queriedUsers) => {
         const camelCasedUsers = queriedUsers.map((queriedUser) => {
            // camelCasedUsers gives us an object for EVERY SELECTED ANSWER
            // so multiple objects for each user
            return {
               userId: queriedUser.user_id,
               username: queriedUser.username,
               firstName: queriedUser.first_name,
               lastName: queriedUser.last_name,
               email: queriedUser.email,
               phoneCountryCode: queriedUser.phone_country_code,
               phoneAreaCode: queriedUser.phone_area_code,
               phoneLineNumber: queriedUser.phone_line_number,
               phoneExtension: queriedUser.phone_extension,
               birthdate: queriedUser.birthdate,
               createdAt: queriedUser.created_at,
               verifyPhotoUrl: queriedUser.verify_photo_url,
               questionId: queriedUser.question_id,
               selectedAnswerId: queriedUser.selected_answer_id,
            };
         });
         // console.log("Here are camel cased users: ", camelCasedUsers);
         // res.json(camelCasedUsers);
         return camelCasedUsers;
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
   // console.log("Here are queriedUsers: ", queriedUsers);

   let queriedQuestions = await db
      .query(selectAllQuestionsAndAnswerChoices)
      .then((queriedQuestions) => {
         const camelCasedQuestions = queriedQuestions.map((queriedQuestion) => {
            return {
               questionId: queriedQuestion.question_id,
               questionTitle: queriedQuestion.question_title,
               questionType: queriedQuestion.question_type,
               questionLimit: queriedQuestion.question_limit,
               answerChoiceId: queriedQuestion.answer_id,
               answerChoiceText: queriedQuestion.answer_text,
               answerChoicePosition: queriedQuestion.answer_position,
            };
         });
         // console.log(
         //    "Here are the camel cased questions: ",
         //    camelCasedQuestions
         // );
         // res.json(camelCasedQuestions);
         return camelCasedQuestions;
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
   // console.log("Here are queriedQuestions: ", queriedQuestions);

   const formattedUsers = queriedUsers.map((queriedUser) => {
      return {
         userId: queriedUser.userId,
         username: queriedUser.username,
         firstName: queriedUser.firstName,
         lastName: queriedUser.lastName,
         email: queriedUser.email,
         phoneCountryCode: queriedUser.phoneCountryCode,
         phoneAreaCode: queriedUser.phoneAreaCode,
         phoneLineNumber: queriedUser.phoneLineNumber,
         phoneExtension: queriedUser.phoneExtension,
         birthdate: queriedUser.birthdate,
         password: queriedUser.password,
         createdAt: queriedUser.createdAt,
         verifyPhotoUrl: queriedUser.verifyPhotoUrl,
         questions: uniqBy(queriedQuestions, `questionId`).map(
            (uniqQuestion) => {
               return {
                  questionId: uniqQuestion.questionId,
                  questionTitle: uniqQuestion.questionTitle,
                  questionType: uniqQuestion.questionType,
                  questionLimit: uniqQuestion.questionLimit,
                  answerChoices: orderBy(
                     queriedQuestions
                        .map((queriedQuestion) => {
                           return {
                              answerChoiceText:
                                 queriedQuestion.answerChoiceText,
                              answerChoiceId: queriedQuestion.answerChoiceId,
                              answerChoicePosition:
                                 queriedQuestion.answerChoicePosition,
                              questionId: queriedQuestion.questionId,
                              // put every single answer choice for all questions under one question
                              // add questionId temporarily to filter by it
                           };
                        })
                        .filter((answerChoice) => {
                           return (
                              uniqQuestion.questionId ===
                              answerChoice.questionId
                           );
                        })
                        .map((answerChoice) => {
                           delete answerChoice.questionId;
                           return answerChoice;
                        }), // all of this from 225 to here is answerChoices
                     `answerChoicePosition`,
                     `asc`
                  ), // can just put answerChoices, since they're the same
                  selectedAnswerIds: queriedUsers
                     .map((queriedUserForAnswers) => {
                        // we want every selected answer from every single user
                        // for the question id
                        return {
                           selectedAnswerId:
                              queriedUserForAnswers.selectedAnswerId,
                           userId: queriedUserForAnswers.userId,
                           questionId: queriedUserForAnswers.questionId,
                        };
                     })
                     .filter((selectedAnswer) => {
                        return (
                           selectedAnswer.questionId ===
                              uniqQuestion.questionId &&
                           selectedAnswer.userId === queriedUser.userId
                        );
                     })
                     .map((selectedAnswer) => {
                        return selectedAnswer.selectedAnswerId;
                     }),
               };
            }
         ),
      };
   });

   const uniqUsers = uniqBy(formattedUsers, `userId`);
   return uniqUsers;
}

module.exports = router;
