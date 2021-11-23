import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { IQuestion, ICategory } from "../../../interfaces/submission";
import { serverLink } from "../../../utils/serverlink";

const useData = () => {
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [getQuestionsLoading, setQuestionsLoading] =
    React.useState<boolean>(false);
  const [isSaveModalOpen, setSaveModalOpen] = React.useState<boolean>(false);
  const [editQuestion, setEditQuestion] = React.useState<IQuestion | null>(
    null
  );
  const [deleteQuestionId, setDeleteQuestionId] = React.useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] =
    React.useState<boolean>(false);
  const [saveCategoryId, setSaveCategoryId] = React.useState<string>("");

  const state = {
    questions,
    categories,
    getQuestionsLoading,
    isSaveModalOpen,
    editQuestion,
    deleteQuestionId,
    isDeleteModalOpen,
    saveCategoryId,
  };

  const toggleSaveModal = () => {
    setSaveModalOpen(!isSaveModalOpen);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
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
    setQuestionsLoading(true);
    try {
      await getCategories();
      await getQuestions();
    } catch (err) {
      console.log(err);
      toast.error("Trouble fetching questions");
    } finally {
      setQuestionsLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return {
    state,
    toggleSaveModal,
    getQuestions,
    setEditQuestion,
    toggleDeleteModal,
    setDeleteQuestionId,
    setSaveCategoryId,
  };
};

export default useData;
