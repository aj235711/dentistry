import * as React from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { serverLink } from "../../../../../utils/serverlink";

interface IParams {
  onDone: () => void;
  toggle: () => void;
  currText: string;
  _id: string;
  categoryId: string;
}

const useData = ({ onDone, toggle, currText, _id, categoryId }: IParams) => {
  const [saveQuestionLoading, setSaveQuestionLoading] =
    React.useState<boolean>(false);
  const [text, setText] = React.useState<string>(currText);

  const state = {
    saveQuestionLoading,
    text,
  };

  const handleSubmit = async () => {
    setSaveQuestionLoading(true);
    try {
      await axios.post(
        `${serverLink}/${_id ? "editQuestion" : "addQuestion"}`,
        {
          text,
          _id,
          category: categoryId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      onDone();
      toggle();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSaveQuestionLoading(false);
    }
  };

  return {
    state,
    setText,
    handleSubmit,
  };
};

export default useData;
