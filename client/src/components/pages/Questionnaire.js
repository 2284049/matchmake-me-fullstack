import React from "react";
import { Link } from "react-router-dom";
import purpleLogo from "../../icons/purplelogo.png";
import photoPose from "../../img/photogesture.jpg";
import RadioQuestion from "../ui/RadioQuestion";
import CheckboxQuestion from "../ui/CheckboxQuestion";
import LikertQuestion from "../ui/LikertQuestion";
import cloneDeep from "lodash/cloneDeep";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";
// import currentUser from "../../mock-data/current-user";

class Questionnaire extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         currentUserData: this.props.currentUser,
         allQuestions: [],
      };
      this.setCurrentUserData = this.setCurrentUserData.bind(this);
      this.setCurrentUserDataRadioVersion = this.setCurrentUserDataRadioVersion.bind(
         this
      );
      // we have to bind the parent this.setCurrentUserDate with the child this.setCurrentUserData
   }

   // GET ALL QUESTIONS AND ANSWERS
   // IF USER IS IN THE "MATCH" RESOURCE (THEY COMPLETED THE QUESTIONNAIRE),
   // POPULATE ANSWERS ON PAGE LOAD, UPDATE WHEN CHANGED
   // OTHERWISE
   // HAVE QUESTIONS BE BLANK AND POST ANSWERS

   async componentDidMount() {
      await axios
         .get("http://localhost:3046/api/v1/questions1") // GET THE QUESTIONS AND ANSWERS TO SHOW ON THE PAGE
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               allQuestions: res.data,
            });
         })
         .catch((error) => {
            // handle error
         });
      // await axios
      //    .get(`http://localhost:3046/api/v1/matches`)
      //    .then((res) => {
      //       // handle success
      //       console.log(res);
      //       // filter the response for the current user's object & update current user with that
      //       this.props.dispatch({
      //          type: actions.UPDATE_CURRENT_USER,
      //          payload: res.data,
      //       });
      //    })
      //    .catch((error) => {
      //       // handle error
      //    });
      // this.setState({
      //    currentUserData: this.props.currentUser,
      // });
   }

   // // DO THIS IN CASE THE DATA DOESN'T LOAD RIGHT AWAY AND UPDATE THE STATE
   // componentDidUpdate(prevProps) {
   //    if (this.props.currentUser !== prevProps.currentUser) {
   //       this.setState({
   //          currentUserData: this.props.currentUser,
   //       });
   //    }
   // }

   setCurrentUserData(e) {
      console.log(
         "You've made changes to the parent component. Here is the event: ",
         e
      );
      console.log("Here is the value: ", e.target.value);
      const questionId = e.target.name; // the id of the question
      const updatedAnswerId = e.target.id; // the current selected answer id
      const copyOfCurrentUserData = cloneDeep(this.state.currentUserData); // lodash cloneDeep to make a DEEP COPY
      let updatedAnswerIds = []; // creating an empty array of the updated answer ids, which will replace the selected answer ids array
      const question = copyOfCurrentUserData.questions.find((question) => {
         return question.id === questionId; // gives us the question where the current selection is being made; in the questions array, we want to find the question that has the same id as the current selected answer
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
      const questionIndex = copyOfCurrentUserData.questions.findIndex(
         (question) => {
            // we want to find the index of the question object for a particular id that matches the question index of our updated selected answer
            return question.id === questionId;
         }
      );
      copyOfCurrentUserData.questions[questionIndex] = question; // replace the original question object with the new updated selected answer question object

      // update the state
      this.setState({
         currentUserData: copyOfCurrentUserData, // we are updating the currentUserData here to reflect the changes made in the copy
      });
   }

   setCurrentUserDataRadioVersion(e) {
      console.log(
         "You've made changes to the parent component. Here is the event: ",
         e
      );
      console.log("Here is the value: ", e.target.value);
      const questionId = e.target.name; // the id of the question
      const updatedAnswerId = e.target.id; // the current selected answer id
      const copyOfCurrentUserData = cloneDeep(this.state.currentUserData); // lodash cloneDeep to make a DEEP COPY
      const question = copyOfCurrentUserData.questions.find((question) => {
         return question.id === questionId; // gives us the question where the current selection is being made; in the questions array, we want to find the question that has the same id as the current selected answer
      });
      const updatedAnswerIds = [updatedAnswerId]; // creating an empty array of the updated answer ids, which will replace the selected answer ids array
      question.selectedAnswerIds = updatedAnswerIds; // we've now switched out the arrays
      const questionIndex = copyOfCurrentUserData.questions.findIndex(
         (question) => {
            // we want to find the index of the question object for a particular id that matches the question index of our updated selected answer
            return question.id === questionId;
         }
      );
      copyOfCurrentUserData.questions[questionIndex] = question; // replace the original question object with the new updated selected answer question objectnpm s
      this.setState({
         // update the state
         currentUserData: copyOfCurrentUserData, // we are updating the currentUserData here to reflect the changes made in the copy
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
                  <form>
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
                  </form>

                  {/* {this.state.allQuestions && */}
                  {this.state.allQuestions.map((question) => {
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

                  <p className="mb-4">
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
                     </div>
                     <div className="col-md-3"></div>
                     <div className="col-12 text-center">
                        <Link
                           to="/matches"
                           className="btn btn-primary btn-lg px-8 mt-7"
                        >
                           Continue
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //global state
   console.log("this is the state of current user", state.currentUser);
   return {
      currentUser: state.currentUser,
   };
}
export default connect(mapStateToProps)(Questionnaire);
