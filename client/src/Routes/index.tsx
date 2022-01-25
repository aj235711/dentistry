import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Components/Navbar";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Categories from "./AdminPage/Categories";
import Questions from "./AdminPage/Questions";
import Otp from "./Otp";
import SubmissionForm from "./SubmissionForm";
import ResponsesAndResults from "./ResponsesAndResults";
import Projects from "./Projects";
import { NotFound } from "../Components";

const Routes: React.FC = () => {
  return (
    <Router>
      <Route
        path={[
          "/",
          "/categories",
          "/questions",
          "/make_submission",
          "/responses_and_results/:submissionId",
          "/myprojects",
        ]}
        exact
        component={Navbar}
      />
      <Switch>
        <Route path="/signup" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/questions" exact component={Questions} />
        <Route path="/make_submission" exact component={SubmissionForm} />
        <Route
          path="/responses_and_results/:submissionId"
          exact
          component={ResponsesAndResults}
        />
        <Route path="/myprojects" exact component={Projects} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
