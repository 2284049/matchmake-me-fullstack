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
         const individualMatch = users.map((user) => {
            if (!user.userId === this.props.currentUser.userId) {
               match.score = Date.now(); // adding createdAt property

               return user;
            }
         });

         //    this.props.dispatch({
         //       type: actions.STORE_MATCHES,
         //       payload: res.data,
         //    });
      })
      .catch((error) => {
         // handle error
      });
   // make an array of current user answers from db
   // make an array of current match answers from db
   // map through each current user answer,
   // if current user answer id is X and current match answers array includes
   // answer choice 1, take current score and add 5
}
function mapStateToProps(state) {
   //global state
   return {
      currentUser: state.currentUser,
   };
}
export default withRouter(connect(mapStateToProps)(calculateMatchScore));
