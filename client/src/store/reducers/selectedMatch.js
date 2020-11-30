import actions from "../actions";

export default function selectedMatch(selectedMatch = {}, action) {
   switch (action.type) {
      case actions.STORE_SELECTED_MATCH:
         return action.payload; // new state
      default:
         return selectedMatch;
   }
}
