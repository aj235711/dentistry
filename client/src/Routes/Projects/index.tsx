import * as React from "react";
import moment from "moment";

import useData from "./data";
import { Placeholder } from "../../Components";

const Projects: React.FC = () => {
  const { state } = useData();
  const { projects, getProjectsLoading } = state;

  return (
    <>
      <div className="h-auto w-screen d-flex flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>My Projects</h4>
        </div>
        <div className="w-full py-5 flex justify-center items-center flex-wrap">
          {getProjectsLoading ? (
            <Placeholder height={200} />
          ) : (
            <>
              {projects.map((project) => (
                <div className="w-full lg:w-1/4 p-5">
                  <div className="w-full rounded-md shadow-lg border border-gray-200">
                    <div className="w-full p-2 border-b border-gray-200 text-xl">
                      {project.name}
                    </div>
                    <div className="w-full p-3">
                      <div className="w-full py-2">
                        Total Submissions: {project.submissions.length}
                      </div>
                      <div className="w-full py-2">
                        {`Last Submission: ${moment(project.latest).fromNow()}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
