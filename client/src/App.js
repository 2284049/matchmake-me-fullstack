import React from "react";
import "./style/master.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import SignInPage from "./components/pages/SignInPage";
import Questionnaire from "./components/pages/Questionnaire";
import Matches from "./components/pages/MatchesPage";
import Match from "./components/pages/MatchPage";
import NotFound from "./components/pages/NotFound";

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
