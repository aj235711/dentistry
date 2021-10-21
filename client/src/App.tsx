import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

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
      <Scrollbars autoHide style={{ height: "100vh", width: "100vw" }}>
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
      </Scrollbars>
    </>
  );
};

export default App;
