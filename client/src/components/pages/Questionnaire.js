import React from "react";
import purpleLogo from "../../icons/purplelogo.png";
import photoPose from "../../img/photogesture.jpg";
import RadioQuestion from "../ui/RadioQuestion";
import CheckboxQuestion from "../ui/CheckboxQuestion";
import LikertQuestion from "../ui/LikertQuestion";
import cloneDeep from "lodash/cloneDeep";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";

class Questionnaire extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         currentUserData: this.props.currentUser,
      };
      this.setCurrentUserData = this.setCurrentUserData.bind(this);
      this.setCurrentUserDataRadioVersion = this.setCurrentUserDataRadioVersion.bind(
         this
      ); // we have to bind the parent this.setCurrentUserDate with the child this.setCurrentUserData
   }

   componentDidMount() {
      this.setState({
         currentUserData: this.props.currentUser,
      });
   }

   // DO THIS IN CASE THE DATA DOESN'T LOAD RIGHT AWAY AND UPDATE THE STATE
   componentDidUpdate(prevProps) {
      if (this.props.currentUser !== prevProps.currentUser) {
         this.setState({
            currentUserData: this.props.currentUser,
         });
      }
   }

   // setUserAnswer() {
   //    console.log("you set a user answer");
   //    const userAnswer = {
   //       id: getUuid(),
   //       userId: this.props.currentUser.id,
   //       answerId: e.target.id,
   //    };
   //    this.props.dispatch({
   //       type: actions.UPDATE_CREATABLE_CARD,
   //       payload: creatableCard,
   //    });
   //    console.log("here is the user answer object: ", userAnswer);
   //    // axios request send this user object to the server
   //    axios
   //       .post("/api/v1/answers", answer)
   //       .then((res) => {
   //          console.log("user answer set: ", res);
   //       })
   //       .catch((err) => {
   //          const data = err.response.data;
   //          console.log(data);
   //          // display error overlay & hide error overlay after 5 sec
   //       });
   // }

   async setCurrentUserData(e) {
      console.log("Here is the value: ", e.target.value);
      const questionId = e.target.name; // the id of the question
      const updatedAnswerId = e.target.id; // the current selected answer id
      const updatedCurrentUserData = cloneDeep(this.state.currentUserData); // lodash cloneDeep to make a DEEP COPY
      let updatedAnswerIds = []; // creating an empty array of the updated answer ids, which will replace selectedAnswerIds
      const question = updatedCurrentUserData.questions.find((question) => {
         return question.questionId === questionId; // gives us the question where the current selection is being made; in the questions array, we want to find the question that has the same id as the current selected answer
      });
      if (question.selectedAnswerIds.includes(updatedAnswerId)) {
         // on the current question, if the selected answers array includes the current selected answer id (it was checked previously)
         updatedAnswerIds = question.selectedAnswerIds.filter(
            (selectedAnswerId) => {
               return selectedAnswerId !== updatedAnswerId; // filter through and only include ids in updatedAnswerIDs where this is true: the updated answer id was not already in the array of selectedAnswerIds
            }
         ); // example: "divorced" was already a selected answer and it's id was in the selectedAnswerIds array.
         // if "divorced" is clicked on again (it's now the updatedAnswerId), the updatedAnswerIds array will not include it anymore
         // the updatedAnswerIds array was filtered to only include updated answer ids that weren't already in the selectedAnswerId array
      } else {
         updatedAnswerIds = question.selectedAnswerIds.concat(updatedAnswerId);
         // if the updated answer id was not included in the selectedAnswerIds array, then we want to add the updated answer id to the updatedAnswerIds array
      }
      question.selectedAnswerIds = updatedAnswerIds; // we've now switched out the arrays
      const questionIndex = updatedCurrentUserData.questions.findIndex(
         (question) => {
            // we want to find the index of the question object for a particular id that matches the question index of our updated selected answer
            return question.questionId === questionId;
         }
      );
      updatedCurrentUserData.questions[questionIndex] = question; // replace the original question object with the new updated selected answer question object

      // update the state
      await this.setState({
         currentUserData: updatedCurrentUserData, // we are updating the currentUserData here to reflect the changes made in the copy
      });
      // update redux store:
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: this.state.currentUserData,
      });
   }

   async setCurrentUserDataRadioVersion(e) {
      console.log("Here is the value: ", e.target.value);
      const questionId = e.target.name; // the id of the question
      const updatedAnswerId = e.target.id; // the current selected answer id
      const updatedCurrentUserData = cloneDeep(this.state.currentUserData); // lodash cloneDeep to make a DEEP COPY
      const question = updatedCurrentUserData.questions.find((question) => {
         return question.questionId === questionId; // gives us the question where the current selection is being made; in the questions array, we want to find the question that has the same id as the current selected answer
      });
      const updatedAnswerIds = [updatedAnswerId]; // creating an empty array of the updated answer ids, which will replace the selected answer ids array
      question.selectedAnswerIds = updatedAnswerIds; // we've now switched out the answer arrays
      const questionIndex = updatedCurrentUserData.questions.findIndex(
         (question) => {
            // we want to find the index of the question object for a particular id that matches the question index of our updated selected answer
            return question.questionId === questionId;
         }
      );
      updatedCurrentUserData.questions[questionIndex] = question; // replace the original question object with the new updated selected answer question objectnpm s
      await this.setState({
         currentUserData: updatedCurrentUserData, // we are updating the currentUserData here to reflect the changes made in the copy
      });
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: this.state.currentUserData,
      });
   }

   updateSelectedAnswers() {
      axios
         .get(`http://localhost:3046/api/users/currentUser`)
         .then((res) => {
            // handle success
            console.log("Here is the current user: ", res.data);
            const currentUserInDb = res.data;
            const currentUserInRedux = this.props.currentUser;
            // map over all selectedAnswerIds in Redux
            // if Redux selectedAnswerId does not match a selectedAnswerId in the db,
            // add (POST) that selected answer object to the db
            // map over all selectedAnswerIds in DB
            // if DB selectedAnswerId does not match a selectedAnswerId in Redux,
            // delete that selected answer row from the db

            // execute setMatchScore function
         })
         .catch((error) => {
            // handle error
         });
   }

   render() {
      return (
         <div className="container mb-8">
            <div className="row">
               <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                  <div className="row mb-7">
                     <div className="col-12 d-flex justify-content-center align-items-center">
                        <img
                           src={purpleLogo}
                           width="40px"
                           alt="Matchmake Me Logo"
                        />
                        <h2 className="text-brand text-primary d-inline mt-2 ml-2">
                           Matchmake Me
                        </h2>
                     </div>
                  </div>
                  {/* <form>
                     <div className="form-row">
                        <div className="col-8">
                           <label htmlFor="name">Name</label>
                           <input
                              type="text"
                              className="form-control"
                              id="name"
                           />
                        </div>
                        <div className="col-4">
                           <label htmlFor="birthdate">Birthdate</label>
                           <input
                              type="text"
                              className="form-control"
                              placeholder="mmddyyyy"
                              id="birthdate"
                           />
                        </div>
                     </div>
                  </form> */}

                  {this.state.currentUserData.questions &&
                     this.state.currentUserData.questions.map((question) => {
                        if (question.questionType === 1) {
                           return (
                              <RadioQuestion
                                 question={question}
                                 key={question.questionId}
                                 setData={this.setCurrentUserDataRadioVersion}
                              />
                           );
                        } else if (question.questionType === 2) {
                           return (
                              <CheckboxQuestion
                                 question={question}
                                 key={question.questionId}
                                 setData={this.setCurrentUserData}
                              />
                           );
                        } else if (question.questionType === 3) {
                           return (
                              <LikertQuestion
                                 question={question}
                                 key={question.questionId}
                                 setData={this.setCurrentUserDataRadioVersion}
                              />
                           );
                        }
                        return <></>;
                     })}

                  {/* <p className="mb-4">
                     Please upload an unedited non-filtered photo matching the
                     following pose.
                  </p>
                  <div className="row">
                     <div className="col-3 col-lg-4"></div>
                     <div className="col-6 col-lg-4">
                        <img
                           className="mb-4"
                           src={photoPose}
                           width="100%"
                           alt="Pose"
                        />
                     </div>
                     <div className="col-3 col-lg-4"></div>
                     <div className="col-md-3"></div>
                     <div className="col-12 col-md-6">
                        <div className="custom-file">
                           <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                           />
                           <label
                              className="custom-file-label"
                              htmlFor="customFile"
                           >
                              Choose photo
                           </label>
                        </div>
                     </div> */}
                  <div className="col-md-3"></div>
                  <div className="col-12 text-center">
                     <button
                        className="btn btn-primary btn-lg px-8 mt-7"
                        id="save-and-continue"
                        onClick={() => {
                           this.updateSelectedAnswers();
                        }}
                     >
                        Save and continue
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   // Redux Global State Store
   return {
      currentUser: state.currentUser,
   };
}
export default connect(mapStateToProps)(Questionnaire);
