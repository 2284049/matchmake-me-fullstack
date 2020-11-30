import React from "react";
import { Link } from "react-router-dom";
import purpleAppLogo from "../../icons/purplelogo.png";
import leftChevron from "../../icons/chevron-left.svg";
import heartIcon from "../../icons/heart.svg";
import RadioQuestion from "../ui/RadioQuestion";
import CheckboxQuestion from "../ui/CheckboxQuestion";
import LikertQuestion from "../ui/LikertQuestion";
import { connect } from "react-redux";

// // console.log(`Here is the top match data: `, selectedMatch);
// const selectedMatchQuestions = selectedMatch.questions;
// console.log(`Here are the top match questions: `, selectedMatchQuestions);
// const selectedAnswers = selectedMatchQuestions.selectedAnswerIds;
// // console.log(selectedAnswers);

class MatchPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedMatchData: {},
      };
      this.setSelectedMatchData = this.setSelectedMatchData.bind(this);
      this.setSelectedMatchDataRadioVersion = this.setSelectedMatchDataRadioVersion.bind(
         this
      );
   }

   componentDidMount() {
      this.setState({
         selectedMatchData: this.props.selectedMatch,
      });
   }

   // DO THIS IN CASE THE DATA DOESN'T LOAD RIGHT AWAY AND UPDATE THE STATE
   componentDidUpdate(prevProps) {
      if (this.props.selectedMatch !== prevProps.selectedMatch) {
         this.setState({
            selectedMatchData: this.props.selectedMatch,
         });
      }
   }

   setSelectedMatchData(e) {}
   setSelectedMatchDataRadioVersion(e) {}

   scheduleDate() {
      window.open(
         "mailto:someonesomewhere@gmail.com?subject=Schedule a date&body=" +
            `I would like to schedule a date with ${this.props.selectedMatch.username}.`,
         "_blank"
      );
   }

   //   $("#email-button").click(function () {
   //    window.open(
   //       "mailto:someonesomewhere@gmail.com?subject=Hello&body=" +
   //          $("#contact-form-text-box").val(),
   //       "_blank"
   //    );
   // });

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                  <div className="row mb-7">
                     <div className="col-12 d-flex justify-content-center align-items-center">
                        <img
                           src={purpleAppLogo}
                           width="40px"
                           alt="Matchmake Me Logo"
                        />
                        <h2 className="text-brand text-primary d-inline mt-2 ml-2">
                           Matchmake Me
                        </h2>
                     </div>
                  </div>
                  <Link
                     to="/matches"
                     className="btn btn-link mb-7"
                     role="button"
                  >
                     <img
                        src={leftChevron}
                        width="20px"
                        className="mr-1 mb-1"
                        alt=""
                     />
                     Back to Matches
                  </Link>
                  <div className="col-12 col-md-11 col-lg-10 col-xl-9">
                     <button
                        className="btn btn-primary px-6 d-flex float-right schedule-button"
                        style={{
                           zIndex: "1",
                           boxShadow: "2px 2px 7px 0px rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={() => {
                           this.scheduleDate();
                        }}
                     >
                        <img
                           src={heartIcon}
                           width="20px"
                           className="mr-2"
                           alt=""
                        />
                        Schedule a date
                     </button>
                  </div>
                  <div className="row">
                     <div className="col-12 col-sm-7 mb-2 mb-sm-6">
                        <img
                           src={this.props.selectedMatch.verifyPhotoUrl}
                           width="100%"
                           height="auto"
                           style={{ borderRadius: "0.75rem" }}
                           alt="Match"
                        />
                     </div>
                     <div className="col-12 col-sm-5 d-inline">
                        <p className="p-large mb-2">
                           ID: {this.props.selectedMatch.username}
                        </p>
                        <p className="p-large mt-n2 mb-6">
                           {this.props.selectedMatch.age}
                        </p>
                     </div>
                  </div>

                  {this.props.selectedMatch.questions.map((question) => {
                     if (question.type === 1) {
                        return (
                           <RadioQuestion
                              question={question}
                              key={question.id}
                              setData={this.setSelectedMatchDataRadioVersion}
                           />
                        );
                     } else if (question.type === 2) {
                        return (
                           <CheckboxQuestion
                              question={question}
                              key={question.id}
                              setData={this.setSelectedMatchData}
                           />
                        );
                     } else if (question.type === 3) {
                        return (
                           <LikertQuestion
                              question={question}
                              key={question.id}
                              setData={this.setSelectedMatchDataRadioVersion}
                           />
                        );
                     }
                     return <></>;
                  })}

                  <div className="row mb-2">
                     <div className="col-12">
                        <p className="d-inline">Job field:</p>
                        <p className="text-muted d-inline ml-2">
                           Architecture / Engineering
                        </p>
                     </div>
                  </div>
                  <div className="row mb-2">
                     <div className="col-12">
                        <p className="d-inline">
                           {this.props.selectedMatch.questions[0].title}
                        </p>
                        <p className="text-muted d-inline ml-2">
                           Never married
                        </p>
                     </div>
                  </div>
                  <div className="row mb-7">
                     <div className="col-12">
                        <p className="d-inline">Do you have any kids?</p>
                        <p className="text-muted d-inline ml-2">No</p>
                     </div>
                  </div>
                  <p className="p-large mb-3">Interests and Hobbies</p>
                  <ul>
                     <li>
                        <p className="mb-3">Photography</p>
                     </li>
                     <li>
                        <p className="mb-3">Religious activities</p>
                     </li>
                     <li>
                        <p className="mb-3">Hiking</p>
                     </li>
                     <li>
                        <p className="mb-3">International travel</p>
                     </li>
                     <li>
                        <p className="mb-7">Camping</p>
                     </li>
                  </ul>
                  <p className="p-large mb-3">Things in Common</p>
                  <ul className="mb-8">
                     <li>
                        <p className="mb-3">
                           Living a health lifestyle is important to both of
                           you.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">
                           Both of you are Christian/Protestant.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">
                           He would also like to have children in the future.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">
                           You both have a bachelor's degree or higher.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">
                           Racial injustice is an important issue to both of
                           you.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">
                           Both of you have one or more dogs.
                        </p>
                     </li>
                     <li>
                        <p className="mb-3">Neither of you smoke.</p>
                     </li>
                     <li>
                        <p className="mb-3">
                           Drinking weekly is typical for both of you.
                        </p>
                     </li>

                     <li>
                        <p className="mb-3">
                           You both enjoy the following: traveling
                           internationally, camping, and photography.
                        </p>
                     </li>
                  </ul>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>Do you have any kids?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">No</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>Do you want to have kids in the future?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Yes</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>How often do you smoke?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Never</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>How often do you drink?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">A couple times a year</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>What are your main interests?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Sports and Volunteering</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>How important is healthy eating to you?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Somewhat important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           How important are your spiritual/religious beliefs to
                           you?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Extremely important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           How important is it for you to climb the ladder at
                           your job and get promotions?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">A little important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>How important is exercise or working out to you?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Somewhat important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           How important is it to you to participate in
                           spiritual/religious activities?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Extremely important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           How important is it that other people notice and
                           admire your accomplishments?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Not really important</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>Which political topics are most important to you?</p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">
                           Racial Injustice and Illegal Immigration
                        </p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           Which political topics are least important to you?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Climate Change and Drugs</p>
                     </div>
                  </div>
                  <div className="row mb-8">
                     <div className="col-6 col-md-7 col-lg-8 col-xl-8">
                        <p>
                           Which spiritual/religious beliefs are closest to your
                           own?
                        </p>
                     </div>
                     <div className="col-6 col-md-5 col-lg-4 col-xl-4">
                        <p className="text-muted">Christian / Protestant</p>
                     </div>
                  </div>
                  <div className="custom-control custom-checkbox mt-5 mb-3">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id="show-not-interested"
                     />
                     <label
                        className="custom-control-label text-muted"
                        htmlFor="show-not-interested"
                     >
                        I'm not interested.
                     </label>
                  </div>
                  <button
                     type="button"
                     className="btn btn-danger mb-8 d-none"
                     id="not-interested-button"
                  >
                     Remove from matches
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //global state
   return {
      selectedMatch: state.selectedMatch,
   };
}
export default connect(mapStateToProps)(MatchPage);
