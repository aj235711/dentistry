import { Dispatch } from "redux";

import * as actionTypes from "./types";

type dispatchType = Dispatch<actionTypes.UserDispatchTypes>;

export const setCurrentUser = (submissionId: string) => {
  return {
    type: "SET_SUBMISSION_ID",
    payload: { submissionId },
  };
};
