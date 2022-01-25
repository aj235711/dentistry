import * as React from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { serverLink } from "../../../../../utils/serverlink";

interface IParams {
  onDone: () => void;
  toggle: () => void;
  currDescription: string;
  _id: string;
}

const useData = ({ onDone, toggle, currDescription, _id }: IParams) => {
  const [saveCategoryLoading, setSaveCategoryLoading] =
    React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>(currDescription);

  const state = {
    saveCategoryLoading,
    description,
  };

  const handleSubmit = async (values: {
    name: string;
    showNa: string;
    displayOrder: number;
  }) => {
    const { name, showNa, displayOrder } = values;
    setSaveCategoryLoading(true);
    try {
      await axios.post(
        `${serverLink}/${_id ? "editCategory" : "addCategory"}`,
        {
          name,
          description,
          _id,
          showNa,
          displayOrder,
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
      setSaveCategoryLoading(false);
    }
  };

  return {
    state,
    setDescription,
    handleSubmit,
  };
};

export default useData;
