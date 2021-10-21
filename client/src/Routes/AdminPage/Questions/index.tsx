import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { Button, Placeholder } from "../../../Components";
import AddCategoryModal from "./Components/AddCategoryModal";
import DeleteCategoryModal from "./Components/DeleteCategoryModal";
import Card from "./Components/Card";
import useData from "./data";

const Categories: React.FC = () => {
  const {
    state,
    toggleSaveModal,
    getQuestions,
    setEditQuestion,
    toggleDeleteModal,
    setDeleteQuestionId,
    setSaveCategoryId,
  } = useData();
  const {
    getQuestionsLoading,
    questions,
    categories,
    isSaveModalOpen,
    editQuestion,
    isDeleteModalOpen,
    deleteQuestionId,
    saveCategoryId,
  } = state;

  return (
    <>
      <div className="h-auto w-auto flex content-center items-center flex-wrap">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 w-full flex flex-wrap items-center">
          <h4>Questions</h4>
        </div>
        {getQuestionsLoading ? (
          <div className="w-screen">
            <Placeholder height={400} />
          </div>
        ) : categories.length > 0 ? (
          <div className="w-full h-auto flex flex-grow flex-wrap justify-center items-center p-7">
            {categories.map((cat, i) => (
              <Card
                key={i}
                category={cat}
                questions={questions}
                setEditQuestion={setEditQuestion}
                setDeleteQuestionId={setDeleteQuestionId}
                toggleSaveModal={toggleSaveModal}
                toggleDeleteModal={toggleDeleteModal}
                setSaveCategoryId={setSaveCategoryId}
              />
            ))}
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
          onDone={getQuestions}
          editQuestion={editQuestion}
          categoryId={saveCategoryId}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          toggle={toggleDeleteModal}
          onDone={getQuestions}
          _id={deleteQuestionId}
        />
      )}
    </>
  );
};

export default Categories;
