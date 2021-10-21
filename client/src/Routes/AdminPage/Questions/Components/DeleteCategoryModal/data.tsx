import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { serverLink } from "../../../../../utils/serverlink";

interface IParams {
  _id: string;
  toggle: () => void;
  onDone: () => void;
}

const useData = ({ _id, toggle, onDone }: IParams) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const deleteQuestion = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverLink}/deleteQuestion`,
        { _id },
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
      setLoading(false);
    }
  };

  return { loading, deleteQuestion };
};

export default useData;
