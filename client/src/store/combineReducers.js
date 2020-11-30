import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import matches from "./reducers/matches";
import selectedMatch from "./reducers/selectedMatch";

export default combineReducers({
   currentUser,
   matches,
   selectedMatch,
});
