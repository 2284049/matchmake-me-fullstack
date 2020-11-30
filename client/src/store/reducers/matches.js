import actions from "../actions";

export default function matches(matches = [], action) {
   console.log("This is action.payload", action.payload);
   switch (action.type) {
      case actions.STORE_MATCHES:
         return action.payload; // new state
      default:
         return matches;
   }
}
