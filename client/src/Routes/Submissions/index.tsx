import * as React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import useData from "./data";
import { Button, Placeholder } from "../../Components";
import { IProject } from "../../interfaces/submission";
import { getScore } from "./helper";
import DeleteSubmissionModal from "./Components/DeleteSubmissionModal";

const Submissions: React.FC = () => {
  const history = useHistory();

  const { state, toggleDeleteSubmissionModal, getSubmissions } = useData();
  const { submissions, getSubmissionsLoading, isDeleteSubmissionModalVisible } =
    state;

  return (
    <>
      <div className="w-screen d-flex flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>My Submissions</h4>
        </div>
        {getSubmissionsLoading ? (
          <div className="w-full h-auto flex flex-grow justify-center items-center py-10">
            <Placeholder height={200} />
          </div>
        ) : (
          <>
            <div className="w-full h-auto flex flex-grow justify-center items-center py-10">
              {submissions.length === 0 ? (
                <h5 className="h-screen d-flex flex-wrap content-center items-center">
                  You have not made any submissions yet
                </h5>
              ) : (
                <table className="w-11/12 md:w-3/4 border-collapse block md:table">
                  <thead className="bg-gray-50 block md:table-header-group md:border">
                    <tr className="border border-grey-500 md:border-hidden block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                      <th className="p-2 text-left block md:table-cell">
                        Project Name
                      </th>
                      <th className="p-2 text-left block md:table-cell">
                        Date and Time
                      </th>
                      <th className="p-2 text-left block md:table-cell">
                        Score
                      </th>
                      <th className="p-2 text-left block md:table-cell"></th>
                      <th className="p-2 text-left block md:table-cell"></th>
                      <th className="p-2 text-left block md:table-cell"></th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {submissions.map((submission, index) => (
                      <tr
                        className={`bg-${
                          index % 2 === 1 ? "gray-100" : "white"
                        } border border-grey-500 block md:table-row hover:bg-blue-50 transition ease-in-out duration-300`}
                      >
                        <td className="p-2 text-left block md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            Project Name
                          </span>
                          {(submission.projectId as IProject).name}
                        </td>
                        <td className="p-2 text-left block md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            Date and Time
                          </span>
                          {moment(submission.createdAt).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                        <td className="p-2 text-left block md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold">
                            Score
                          </span>
                          {getScore(submission)}
                        </td>
                        <td className="p-2 text-left block md:hidden md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold"></span>
                          <Button
                            classes="px-2 py-1 text-xs mr-2"
                            outline={false}
                            bgc="blue-400"
                            bgch="blue-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={() => {
                              history.push(
                                `/responses_and_results/${submission._id}`
                              );
                            }}
                          >
                            <i className="bx bx-book-open mr-1" />
                            View
                          </Button>
                          <Button
                            classes="px-2 py-1 text-xs mr-3"
                            outline={false}
                            bgc="yellow-400"
                            bgch="yellow-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={() => {
                              history.push(
                                `/responses_and_results/${submission._id}`
                              );
                            }}
                          >
                            <i className="bx bx-edit mr-1" />
                            Edit
                          </Button>
                          <Button
                            classes="px-2 py-1 text-xs"
                            outline={false}
                            bgc="red-400"
                            bgch="red-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={() => {
                              history.push(
                                `/responses_and_results/${submission._id}`
                              );
                            }}
                          >
                            <i className="bx bxs-trash mr-1" />
                            Delete
                          </Button>
                        </td>
                        <td className="p-2 text-left hidden md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold"></span>
                          <Button
                            classes="px-2 py-1 text-xs"
                            outline={false}
                            bgc="blue-400"
                            bgch="blue-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={() => {
                              history.push(
                                `/responses_and_results/${submission._id}`
                              );
                            }}
                          >
                            <i className="bx bx-book-open mr-1" />
                            View
                          </Button>
                        </td>
                        <td className="p-2 text-left hidden md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold"></span>
                          <Button
                            classes="px-2 py-1 text-xs"
                            outline={false}
                            bgc="yellow-400"
                            bgch="yellow-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={() => {
                              history.push(
                                `/edit_submission/${submission._id}`
                              );
                            }}
                          >
                            <i className="bx bx-edit mr-1" />
                            Edit
                          </Button>
                        </td>
                        <td className="p-2 text-left hidden md:table-cell md:py-5">
                          <span className="inline-block w-1/3 md:hidden font-bold"></span>
                          <Button
                            classes="px-2 py-1 text-xs"
                            outline={false}
                            bgc="red-400"
                            bgch="red-500"
                            colorh="white"
                            color="white"
                            rounded="sm"
                            onClick={toggleDeleteSubmissionModal}
                          >
                            <i className="bx bxs-trash mr-1" />
                            Delete
                          </Button>
                          {isDeleteSubmissionModalVisible && (
                            <DeleteSubmissionModal
                              isOpen={isDeleteSubmissionModalVisible}
                              toggle={toggleDeleteSubmissionModal}
                              submissionId={submission._id!}
                              onDone={getSubmissions}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Submissions;
