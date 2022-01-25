import * as React from "react";
import { useParams } from "react-router-dom";

import { FormContainer, ResultGraphs } from "../../Components";

import { useData } from "./data";

const ResponsesAndResults: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();

  const { state, setCurrTab } = useData();

  const { currTab } = state;

  return (
    <>
      <div className="h-auto w-auto flex justify-center items-center flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>Responses and Results</h4>
        </div>
        <div className="w-full pt-5 flex justify-center items-center flex-wrap text-xs md:text-base">
          <div className="w-1/2 flex justify-end">
            <span
              className={`px-3 py-1 cursor-pointer transition-border ease-in-out duration-100 border-b-4 ${
                currTab === "RESPONSES"
                  ? "border-blue-300 text-blue-400 bg-blue-50"
                  : "border-gray-0"
              }`}
              onClick={() => setCurrTab("RESPONSES")}
            >
              Responses
            </span>
          </div>
          <div className="w-1/2 flex justify-start">
            <span
              className={`px-3 py-1 cursor-pointer transition-border ease-in-out duration-100 border-b-4 ${
                currTab === "RESULTS"
                  ? "border-blue-300 text-blue-400 bg-gray-50"
                  : "border-gray-0"
              }`}
              onClick={() => setCurrTab("RESULTS")}
            >
              Results
            </span>
          </div>
        </div>
        {currTab === "RESPONSES" ? (
          <FormContainer submissionId={submissionId} forResponses />
        ) : (
          <ResultGraphs submissionId={submissionId} />
        )}
      </div>
    </>
  );
};

export default ResponsesAndResults;
