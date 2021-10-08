import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import "./App.css";
import Routes from "./Routes";
import store from "./Store";
import { login } from "./Store/Actions/UserActions";

if (localStorage.getItem("jwtToken")) {
  store.dispatch(login(localStorage.getItem("jwtToken")!));
}

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Routes />
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </>
  );
};

export default App;
