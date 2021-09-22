import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Components/Navbar";
import RegisterForm from "./Register";
import LoginForm from "./Login";
import Otp from "./Otp";

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path={["/"]} exact component={Navbar} />
      <Switch>
        <Route path="/signup" exact component={RegisterForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/otp" exact component={Otp} />
      </Switch>
    </Router>
  );
};

export default Routes;
