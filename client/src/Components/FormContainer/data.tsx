import * as React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import {
  ICategory,
  IQuestion,
  IQns,
  ISubmission,
} from "../../interfaces/submission";
import { GET, POST } from "../../utils/axios";

interface IParams {
  submissionId?: string;
}

const useData = ({ submissionId }: IParams) => {
  const history = useHistory();

  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [getQuestionsLoading, setGetQuestionsLoading] =
    React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
  const [currSubmission, setCurrSubmission] =
    React.useState<ISubmission | null>(null);

  const state = {
    questions,
    categories,
    getQuestionsLoading,
    submitLoading,
    currSubmission,
  };

  const getCategories = async () => {
    const { data } = await GET("getCategories");
    setCategories(data.categories);
  };

  const getQuestions = async () => {
    const { data } = await GET("getQuestions");
    setQuestions(data.questions);
  };

  const getCurrSubmission = async () => {
    if (!submissionId) {
      return;
    }
    const { data } = await GET("oneSubmission", {
      submissionId,
    });
    setCurrSubmission(data.submission);
  };

  const getData = async () => {
    setGetQuestionsLoading(true);
    try {
      await Promise.all([getCategories(), getQuestions(), getCurrSubmission()]);
    } catch (err) {
      console.log(err);
      toast.error("Trouble fetching questions");
    } finally {
      setGetQuestionsLoading(false);
    }
  };

  const handleSubmit = async (values: { [key: string]: string }) => {
    setSubmitLoading(true);
    try {
      const qns = Object.keys(values).reduce((acc: IQns[], curr) => {
        if (curr !== "projectName") {
          return [
            ...acc,
            {
              questionId: curr,
              response: values[curr],
            },
          ];
        } else {
          return acc;
        }
      }, []);
      const { data } = await POST("createSubmission", {
        questions: qns,
        projectName: values.projectName,
      });
      toast.success("Submitted successfully");
      history.push(`/responses_and_results/${data.submissionId}`);
    } catch (err) {
      console.log(err);
      toast.error("Could not submit response");
    } finally {
      setSubmitLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return {
    state,
    handleSubmit,
  };
};

export default useData;
