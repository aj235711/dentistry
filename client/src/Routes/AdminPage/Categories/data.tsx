import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { ICategory } from "../../../interfaces/submission";
import { serverLink } from "../../../utils/serverlink";

const useData = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [getCategoriesLoading, setCategoriesLoading] =
    React.useState<boolean>(false);
  const [isSaveModalOpen, setSaveModalOpen] = React.useState<boolean>(false);
  const [editCategory, setEditCategory] = React.useState<ICategory | null>(
    null
  );
  const [deleteCategoryId, setDeleteCategoryId] = React.useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] =
    React.useState<boolean>(false);

  const state = {
    categories,
    getCategoriesLoading,
    isSaveModalOpen,
    editCategory,
    deleteCategoryId,
    isDeleteModalOpen,
  };

  const toggleSaveModal = () => {
    setSaveModalOpen(!isSaveModalOpen);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const getCategories = async () => {
    setCategoriesLoading(true);
    try {
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
    } catch (err) {
      console.log(err);
      toast.error("Trouble fetching categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return {
    state,
    toggleSaveModal,
    getCategories,
    setEditCategory,
    toggleDeleteModal,
    setDeleteCategoryId,
  };
};

export default useData;
