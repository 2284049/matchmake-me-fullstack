import actions from "../actions";

export default function matches(matches = [], action) {
   switch (action.type) {
      case actions.STORE_MATCHES:
         return action.payload; // new state
      default:
         return matches;
   }
}
