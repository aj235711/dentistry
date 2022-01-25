import * as React from "react";

import { FormContainer } from "../../Components";

const SubmissionForm: React.FC = () => {
  return (
    <>
      <div className="h-auto w-auto flex content-center items-center flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>Make Submission </h4>
        </div>
        <FormContainer />
      </div>
    </>
  );
};

export default SubmissionForm;
