import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Components/Navbar";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Categories from "./AdminPage/Categories";
import Questions from "./AdminPage/Questions";
import Otp from "./Otp";

const Routes: React.FC = () => {
  return (
    <Router>
      <Route
        path={["/", "/categories", "/questions"]}
        exact
        component={Navbar}
      />
      <Switch>
        <Route path="/signup" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/categories" exact component={Categories} />
        <Route path="/questions" exact component={Questions} />
      </Switch>
    </Router>
  );
};

export default Routes;
