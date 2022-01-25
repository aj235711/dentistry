import * as React from "react";
import { Formik, Form, Field } from "formik";

import useData from "./data";
import { Button, Placeholder } from "../../Components";
import { IProject } from "../../interfaces/submission";

interface IProps {
  submissionId?: string;
  forResponses?: boolean;
  forEdit?: boolean;
}

const SubmissionForm: React.FC<IProps> = ({
  submissionId,
  forResponses = false,
}) => {
  const { state, handleSubmit } = useData({ submissionId });

  const {
    questions,
    categories,
    getQuestionsLoading,
    submitLoading,
    currSubmission,
  } = state;

  if (getQuestionsLoading) {
    return <Placeholder height={800} />;
  }

  return (
    <>
      <Formik
        initialValues={{
          ...questions.reduce((acc, curr) => {
            if (!currSubmission) {
              return { ...acc, [curr._id]: "NO" };
            } else {
              const ind = (currSubmission.questions || []).findIndex(
                (qn) => qn.questionId === curr._id
              );
              return {
                ...acc,
                [curr._id]: currSubmission.questions[ind]?.response || "NO",
              };
            }
          }, {}),
          projectName: (currSubmission?.projectId as IProject)?.name || "",
        }}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <div className="w-screen flex flex-wrap justify-center items-center py-5">
            <div className="my-4 w-5/6">
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                <i className="bx bx-notepad mr-2" />
                Project Name
              </label>
              <Field
                required
                type="text"
                name="projectName"
                id="projectName"
                placeholder="Enter the name of project"
                className="w-full md:w-1/4 mt-1 block py-2 px-3 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                disabled={forResponses}
              />
            </div>
            {categories.map((category) => (
              <div className="w-5/6 shadow-md bg-white rounded my-3 p-4 border border-gray-100">
                <div className="py-2 px-4 border-b border-gray-200 flex justify-between">
                  <div className="text-lg">{category.name}</div>
                </div>
                <div className="py-2 px-4">
                  {questions
                    .filter((question) => question.category === category._id)
                    .map((question) => (
                      <div className="py-3">
                        <div
                          id="my-radio-group"
                          className="flex justify-between flex-wrap"
                        >
                          <div className="w-11/12">{question.text}</div>
                        </div>
                        <div role="group" aria-labelledby="my-radio-group">
                          <label className="pr-2">
                            <Field
                              type="radio"
                              name={question._id}
                              value="YES"
                              disabled={forResponses}
                            />
                            Yes
                          </label>
                          <label className="px-2">
                            <Field
                              type="radio"
                              name={question._id}
                              value="NO"
                              disabled={forResponses}
                            />
                            No
                          </label>
                          {category.showNa === "YES" && (
                            <label className="px-2">
                              <Field
                                type="radio"
                                name={question._id}
                                value="N/A"
                                disabled={forResponses}
                              />
                              N/A
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            {!forResponses && (
              <div className="w-screen flex justify-center items-center py-5">
                <Button
                  classes="px-2 py-1"
                  type="submit"
                  loading={submitLoading}
                >
                  <i className="bx bxs-add-to-queue mr-2" />
                  Submit
                </Button>
              </div>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default SubmissionForm;
