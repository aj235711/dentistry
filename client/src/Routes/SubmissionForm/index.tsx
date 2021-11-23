import * as React from "react";

import useData from "./data";

const SubmissionForm: React.FC = () => {
  const { state } = useData();
  const { questions, getQuestionsLoading } = state;
  console.log(questions);
  return <></>;
};

export default SubmissionForm;
