import React from "react";
import { Link } from "react-router-dom";
import purpleLogo from "../../icons/purplelogo.png";
import pencilIcon from "../../icons/pencil.svg";
import logoutIcon from "../../icons/account-logout.svg";
import MatchPreview from "../ui/MatchPreview";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Matches extends React.Component {
   componentDidMount() {
      axios
         .get("http://localhost:3046/api/v1/users")
         .then((res) => {
            // handle success
            console.log(res);

            this.props.dispatch({
               type: actions.STORE_MATCHES,
               payload: res.data,
            });
         })
         .catch((error) => {
            // handle error
         });
   }

   logOutCurrentUser() {
      this.props.dispatch({
         // HAD TO HAVE "THIS" FOR PROPS ERROR TO GO AWAY
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   }

   render() {
      // const matchesData = this.props.matches;

      return (
         <div className="container">
            <div className="row">
               <div
                  className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6
    offset-xl-3"
               >
                  <div className="row mb-6">
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
                  <div className="row mb-6">
                     <div className="col-12">
                        <Link
                           to="/questionnaire"
                           className="btn btn-link"
                           role="button"
                        >
                           <img
                              src={pencilIcon}
                              width="16px"
                              className="mr-2 mb-2"
                              alt=""
                           />
                           Edit Your Profile
                        </Link>
                        <Link
                           to="/"
                           className="btn btn-link float-right mt-n1"
                           onClick={() => {
                              this.logOutCurrentUser();
                           }}
                        >
                           <img
                              src={logoutIcon}
                              width="16px"
                              className="mr-1"
                              alt=""
                           />
                           Log out
                        </Link>
                     </div>
                  </div>
                  <div className="row">
                     {this.props.matches.map((individualmatch) => {
                        return (
                           <MatchPreview
                              match={individualmatch}
                              key={individualmatch.userId}
                           />
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //global state
   return {
      matches: state.matches,
   };
}
export default connect(mapStateToProps)(Matches);
