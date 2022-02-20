import * as React from "react";
import { useParams } from "react-router-dom";

import { FormContainer } from "../../Components";

const SubmissionForm: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();

  return (
    <>
      <div className="h-auto w-auto flex content-center items-center flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>Edit Submission </h4>
        </div>
        <FormContainer submissionId={submissionId} forEdit />
      </div>
    </>
  );
};

export default SubmissionForm;
