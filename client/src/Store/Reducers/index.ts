import { combineReducers } from "redux";
import UserReducer, { IState as IUserState } from "./UserReducer";

export interface IApplicationState {
  user: IUserState;
}

export default combineReducers({
  user: UserReducer,
});
