import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import SignInPage from "./components/pages/SignIn";
import Questionnaire from "./components/pages/Questionnaire";
import Matches from "./components/pages/Matches";
import Match from "./components/pages/Match";
import NotFound from "./components/pages/NotFound";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import actions from "./store/actions";
import axios from "axios";

const authToken = localStorage.authToken;
if (authToken) {
   // if the authToken is not expired
   const currentTimeInSeconds = Date.now() / 1000;
   const user = jwtDecode(authToken);
   if (currentTimeInSeconds > user.exp) {
      console.log("expired token");
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
      delete axios.defaults.headers.common["x-auth-token"];

      // remove the currentUser from the global store
   } else {
      console.log("valid token");
      // store user in global state / redux store (currentUser)
      store.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: user,
      });
      // set authorization headers for every request:
      axios.defaults.headers.common["x-auth-token"] = authToken;
      const currentURL = window.location.pathname;
      if (currentURL === "/") {
         window.location.href = "/questionnaire";
         // redirect to next page
      }
   }
   // set authorization headers
} else {
   console.log("no token");
   delete axios.defaults.headers.common["x-auth-token"];
}

function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/questionnaire" component={Questionnaire} />
            <Route exact path="/matches" component={Matches} />
            <Route exact path="/match" component={Match} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
