import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { ICategory, IQuestion } from "../../interfaces/submission";
import { serverLink } from "../../utils/serverlink";

const useData = () => {
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [getQuestionsLoading, setGetQuestionsLoading] =
    React.useState<boolean>(false);

  const state = {
    questions,
    getQuestionsLoading,
  };

  const getCategories = async () => {
    const { data } = await axios.post(
      `${serverLink}/getCategories`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    );
    setCategories(data.categories);
  };

  const getQuestions = async () => {
    const { data } = await axios.post(
      `${serverLink}/getQuestions`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      }
    );
    setQuestions(data.questions);
  };

  const getData = async () => {
    setGetQuestionsLoading(true);
    try {
      await getCategories();
      await getQuestions();
    } catch (err) {
      console.log(err);
      toast.error("Trouble fetching questions");
    } finally {
      setGetQuestionsLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return {
    state,
  };
};

export default useData;
