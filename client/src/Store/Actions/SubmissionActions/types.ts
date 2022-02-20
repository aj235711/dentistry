export interface ISetSubmissionId {
  type: "SET_SUBMISSION_ID";
  payload: { submissionId: string };
}

export type UserDispatchTypes = ISetSubmissionId;
