import React from "react";
// import { Link } from "react-router-dom";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import taskIcon from "../../icons/task.svg";
import { withRouter } from "react-router-dom";
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

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value; // get the user email input
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      console.log({ emailInput, passwordInput });
      // create user obj
      const user = {
         id: getUuid(),
         username: "replace",
         first_name: "replace",
         last_name: "replace",
         email: emailInput,
         phone_country_code: 0,
         phone_area_code: 0,
         phone_line_number: 0,
         phone_extension: null,
         birthdate: 0,
         password: passwordInput,
         createdAt: Date.now(),
         verify_photo_url: "replace",
      };
      console.log("Created user object for POST: ", user);
      // post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            console.log(res.data);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/questionnaire");
         })
         .catch((err) => {
            const data = err.response.data;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError: emailError });
            } else {
               this.setState({ hasEmailError: false, emailError: emailError });
            }
            if (passwordError !== "") {
               this.setState({
                  hasPasswordError: true,
                  passwordError: passwordError,
               });
            } else {
               this.setState({
                  hasPasswordError: false,
                  passwordError: passwordError,
               });
            }
         });
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
