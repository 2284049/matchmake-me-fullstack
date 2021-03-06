import actions from "../actions";
import isEmpty from "lodash/isEmpty";
import axios from "axios";

export default function currentUser(currentUser = {}, action) {
   // let newCurrentUser = { ...currentUser };
   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         if (isEmpty(action.payload)) {
            // if this action.payload object is empty
            // if an object is empty, use the lodash method isEmpty
            // https://youtu.be/5d3bT0Dk8Pw?t=3391
            // make sure you import lodash up top: import isEmpty from "lodash/isEmpty"
            localStorage.removeItem("authToken");
            delete axios.defaults.headers.common["x-auth-token"];
         }
         return action.payload;
      default:
         return currentUser;
   }
}

// export default function currentUser(currentUser = {}, action) {
//    switch (action.type) {
//       case actions.UPDATE_CURRENT_USER:
//          let newCurrentUser = { ...currentUser };
//          newCurrentUser = action.payload;
//          return newCurrentUser; // new state
//       default:
//          return currentUser;
//    }
// }
