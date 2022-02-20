import * as actionTypes from "../Actions/SubmissionActions/types";

export type IState = {
  submissionId: string;
};

const initialState: IState = {
  submissionId: "",
};

const reducer = (
  state = initialState,
  action: actionTypes.UserDispatchTypes
): IState => {
  switch (action.type) {
    case "SET_SUBMISSION_ID":
      return {
        ...state,
        submissionId: action.payload.submissionId,
      };
    default:
      return state;
  }
};

export default reducer;
