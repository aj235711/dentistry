import * as React from "react";

import { Button, Placeholder } from "../../../Components";
import AddCategoryModal from "./Components/AddCategoryModal";
import DeleteCategoryModal from "./Components/DeleteCategoryModal";
import useData from "./data";

const Categories: React.FC = () => {
  const {
    state,
    toggleSaveModal,
    getCategories,
    setEditCategory,
    toggleDeleteModal,
    setDeleteCategoryId,
  } = useData();
  const {
    getCategoriesLoading,
    categories,
    isSaveModalOpen,
    editCategory,
    isDeleteModalOpen,
    deleteCategoryId,
  } = state;

  return (
    <>
      <div className="h-auto w-auto flex content-center items-center flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>Categories</h4>
          <Button
            classes="ml-4 text-sm px-3 py-1"
            onClick={() => {
              setEditCategory(null);
              toggleSaveModal();
            }}
          >
            <i className="bx bxs-add-to-queue mr-2" />
            Add Category
          </Button>
        </div>
        {getCategoriesLoading ? (
          <div className="w-screen">
            <Placeholder height={400} />
          </div>
        ) : categories.length > 0 ? (
          <div className="w-full h-auto flex flex-grow justify-center items-center py-10">
            <table className="w-11/12 md:w-3/4 border-collapse block md:table ">
              <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th className="bg-gray-900 p-2 text-white md:border md:border-gray-700 text-left block md:table-cell">
                    Name
                  </th>
                  <th className="bg-gray-900 p-2 text-white md:border md:border-gray-700 text-left block md:table-cell">
                    Description
                  </th>
                  <th className="bg-gray-900 p-2 text-white md:border md:border-gray-700 text-left block md:table-cell">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {categories.map((category, index) => (
                  <tr
                    className={`bg-${
                      index % 2 === 1 ? "gray-100" : "white"
                    } border border-grey-500 md:border-none block md:table-row`}
                  >
                    <td className="p-2 md:border  text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Name
                      </span>
                      {category.name}
                    </td>
                    <td className="p-2 md:border  text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Description
                      </span>
                      {category.description || "-"}
                    </td>
                    <td className="p-2 md:border  text-left block md:table-cell">
                      <span className="inline-block w-1/3 md:hidden font-bold">
                        Actions
                      </span>
                      <Button
                        classes="mx-1 p-0"
                        outline={false}
                        bgc="inherit"
                        bgch="inherit"
                        colorh="yellow-400"
                        color="yellow-400"
                        onClick={() => {
                          setEditCategory(category);
                          toggleSaveModal();
                        }}
                      >
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        classes="mx-1 p-0"
                        outline={false}
                        bgc="inherit"
                        bgch="inherit"
                        colorh="red-400"
                        color="red-400"
                        onClick={() => {
                          setDeleteCategoryId(category._id!);
                          toggleDeleteModal();
                        }}
                      >
                        <i className="bx bx-trash-alt" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-96 flex flex-grow justify-center items-center py-10">
            No categories to show
          </div>
        )}
      </div>
      {isSaveModalOpen && (
        <AddCategoryModal
          isOpen={isSaveModalOpen}
          toggle={toggleSaveModal}
          onDone={getCategories}
          editCategory={editCategory}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          toggle={toggleDeleteModal}
          onDone={getCategories}
          _id={deleteCategoryId}
        />
      )}
    </>
  );
};

export default Categories;
