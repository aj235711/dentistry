import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "../Components/Navbar";
import RegisterForm from './Register';

const Routes: React.FC = () => {
  return (
    <Router>
      <Route
        path={[
          '/'
        ]}
        exact
        component={Navbar}
      />
      <Switch>
      <Route path="/signup" exact component={RegisterForm} />
      </Switch>
    </Router>
  );
};

export default Routes;
