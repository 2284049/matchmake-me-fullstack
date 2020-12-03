import React from "react";
// import { Link } from "react-router-dom";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import taskIcon from "../../icons/task.svg";
import { withRouter } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   // this function turned into a class will have a bunch of functions in it
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async setEmailState(emailInput) {
      const lowerCasedEmail = emailInput.toLowerCase(); // make their input lowercase
      if (emailInput === "") {
         // if the email input is blank,
         this.setState({
            emailError: "Please enter your email address.", // display this error
            hasEmailError: true, // make the input box red with is-invalid class
         });
      } else if (!EMAIL_REGEX.test(lowerCasedEmail)) {
         // if email does not follow regex format,
         this.setState({
            emailError: "Please enter a valid email address.", //display this error
            hasEmailError: true, // make the input box red with is-invalid class
         });
      } else {
         // otherwise, we don't want an email error (empty string) and we want to set hasEmailError to false to remove is-invalid class
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0]; // the split will give us an array of strings ["local part", "part after @"]; we want the part at index 0
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart); // if this is true, it returns true; if it's false, it returns false
   }

   async setPasswordState(passwordInput, emailInput) {
      const uniqChars = [...new Set(passwordInput)]; // puts all unique characters into an array
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create a password.", // display this error
            hasPasswordError: true, // make the input box red with is-invalid class
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.", // display this error
            hasPasswordError: true, // make the input box red with is-invalid class
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         this.setState({
            passwordError: "Your password cannot contain your email address.", // display this error
            hasPasswordError: true, // make the input box red with is-invalid class
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "Your password must contain at least 3 unique characters.", // display this error
            hasPasswordError: true, // make the input box red with is-invalid class
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value; // get the user email input
      await this.setEmailState(emailInput);
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         // create user obj
         const user = {
            id: getUuid(),
            email: emailInput,
            password: passwordInput,
            createdAt: Date.now(),
         };
         console.log("Created user object for POST: ", user);
         // post to API
         axios
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
            });
         // update currentUser in global state with API response
         // go to next page: this.props.history.push("/create-answer");
      }
   }

   render() {
      // put the body of your function here
      return (
         <div className="col-12 col-md-6 col-lg-5 mr-lg-4">
            <div className="card">
               <div className="card-body text-dark">
                  <img
                     src={taskIcon}
                     width="26px"
                     className="mt-n4 mr-2"
                     alt=""
                  />
                  <h2 className="d-inline">Nice to meet you</h2>
                  <p className="font-sans-serif mt-3 mb-5">
                     Sign up for a free matchmaking account.
                  </p>
                  <div className="form-group">
                     <label
                        htmlFor="signup-email-input"
                        className="lead font-sans-serif"
                     >
                        Email address
                     </label>
                     <input
                        type="email"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasEmailError, // is-invalid class will display when emailError state equals true
                        })}
                        id="signup-email-input"
                     />
                     {this.state.hasEmailError && (
                        // when the hasEmailError state is true
                        // which means there is an error, display this:
                        <p className="text-danger" id="email-error">
                           {this.state.emailError}
                        </p>
                     )}
                  </div>
                  <div className="form-group">
                     <label
                        htmlFor="signup-password-input"
                        className="lead font-sans-serif"
                     >
                        Create a password
                        <br />
                        <span className="text-muted">
                           Must be at least 9 characters
                        </span>
                     </label>
                     <input
                        type="password"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasPasswordError, // is-invalid class will display when emailError state equals true
                        })}
                        id="signup-password-input"
                     />
                     {this.state.hasPasswordError && (
                        <p className="text-danger" id="password-error">
                           {this.state.passwordError}
                        </p>
                     )}
                  </div>
                  <button
                     className="btn btn-primary btn-lg font-sans-serif mt-5"
                     id="sign-up-button"
                     onClick={() => {
                        this.validateAndCreateUser();
                     }}
                  >
                     Sign up
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //global state
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
