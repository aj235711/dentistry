import axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Dispatch } from "redux";

import * as actionTypes from "./types";
import { IUser } from "../../../interfaces/user";

type dispatchType = Dispatch<actionTypes.UserDispatchTypes>;

export const setCurrentUser = (user: IUser) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const login = (token: string) => {
  return (dispatch: dispatchType) => {
    localStorage.setItem("jwtToken", token);
    const user: IUser = jwt_decode(token);
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };
};

export const logoutUser = () => (dispatch: dispatchType) => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: "LOGOUT",
  });
};
