import React from "react";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
// import actions from "../../store/actions";
import { connect } from "react-redux";

function calculateMatchScore() {
   // exact same answer = +10
   // answer 1 away = +5
   // answers extreme opposites = -10
   axios
      .get("http://localhost:3046/api/v1/users")
      .then((res) => {
         // handle success
         console.log(res);
         const users = res.data;
         const currentUser = users.map((user) => {
            return user.userId === this.props.currentUser.userId;
         });
         const individualMatch = users.map((match) => {
            if (!match.userId === this.props.currentUser.userId) {
               match.score = Date.now(); // adding createdAt property

               return user;
            }
         });
      })
      .catch((error) => {
         // handle error
      });

   // map through every current user likert question,
   // get the selected answer id
   // match the selected answer id to the answer choice id to get the answer choice's position
}
function mapStateToProps(state) {
   //global state
   return {
      currentUser: state.currentUser,
   };
}
export default withRouter(connect(mapStateToProps)(calculateMatchScore));
