import * as React from "react";
import { toast } from "react-toastify";

import { IProject } from "../../interfaces/submission";
import { GET } from "../../utils/axios";

const useData = () => {
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [getProjectsLoading, setGetProjectsLoading] =
    React.useState<boolean>(false);

  const state = {
    projects,
    getProjectsLoading,
  };

  const getProjects = async () => {
    try {
      setGetProjectsLoading(true);
      const { data } = await GET("allProjects");
      setProjects(data.projects);
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch your projects");
    } finally {
      setGetProjectsLoading(false);
    }
  };

  React.useEffect(() => {
    getProjects();
  }, []);

  return { state };
};

export default useData;
