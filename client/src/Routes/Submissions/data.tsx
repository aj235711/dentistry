import * as React from "react";
import { toast } from "react-toastify";

import { ISubmission } from "../../interfaces/submission";
import { GET } from "../../utils/axios";

const useData = () => {
  const [submissions, setSubmissions] = React.useState<ISubmission[]>([]);
  const [getSubmissionsLoading, setGetSubmissionsLoading] =
    React.useState<boolean>(false);
  const [isDeleteSubmissionModalVisible, setDeleteSubmissionModalVisible] =
    React.useState<boolean>(false);

  const state = {
    submissions,
    getSubmissionsLoading,
    isDeleteSubmissionModalVisible,
  };

  const toggleDeleteSubmissionModal = () => {
    setDeleteSubmissionModalVisible(!isDeleteSubmissionModalVisible);
  };

  const getSubmissions = async () => {
    try {
      setGetSubmissionsLoading(true);
      const { data } = await GET("allSubmissions");
      setSubmissions(data.submissions);
    } catch (err) {
      console.error(err);
      toast.error("Unable to fetch your submissions");
    } finally {
      setGetSubmissionsLoading(false);
    }
  };

  React.useEffect(() => {
    getSubmissions();
  }, []);

  return { state, toggleDeleteSubmissionModal, getSubmissions };
};

export default useData;
