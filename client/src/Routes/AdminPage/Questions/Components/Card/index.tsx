import * as Reacr from "react";

import { ICategory, IQuestion } from "../../../../../interfaces/submission";
import useData from "./data";
import { Button } from "../../../../../Components";

interface IProps {
  category: ICategory;
  questions: IQuestion[];
  setEditQuestion: (question: IQuestion | null) => void;
  setDeleteQuestionId: (id: string) => void;
  toggleSaveModal: () => void;
  toggleDeleteModal: () => void;
  setSaveCategoryId: (id: string) => void;
}

const Card: React.FC<IProps> = ({
  category,
  questions,
  setEditQuestion,
  setDeleteQuestionId,
  toggleSaveModal,
  toggleDeleteModal,
  setSaveCategoryId,
}) => {
  const { state, setCollapsed } = useData();
  const { isCollapsed } = state;
  console.log({ isCollapsed });
  return (
    <div className="w-full md:w-5/6 shadow-sm border-b border-white">
      <h6
        className={`w-full p-4 flex flex-wrap justify-between items-center cursor-pointer z-50 ${
          isCollapsed
            ? "border border-gray-200"
            : "border-2 border-blue-600 border-opacity-40 bg-gray-50 text-blue-600"
        }`}
        onClick={() => {
          console.log("here");
          setCollapsed(!isCollapsed);
        }}
      >
        <span>{category.name}</span>
        <div
          className={`${
            isCollapsed
              ? "bg-blue-400 text-white border border-blue-900"
              : "bg-white border border-gray-700"
          } rounded-full px-1`}
        >
          <i className={`${isCollapsed ? "bx bx-plus" : "bx bx-minus"}`} />
        </div>
      </h6>
      {!isCollapsed && (
        <div
          className={`w-full flex flex-wrap items-center border border-gray-200 pb-2 mb-1 shadow-md`}
        >
          {questions.some((question) => question.category === category._id) ? (
            <div className="w-full">
              {questions.map((question) =>
                question.category === category._id ? (
                  <div className="py-2 w-full flex flex-wrap justify-between items-center px-4 hover:bg-gray-100">
                    <span className="w-3/4 md:w-11/12">{`${question.text}`}</span>
                    <span className="w-1/4 md:w-1/12 flex flex-wrap justify-end items-center">
                      <Button
                        classes="mx-1 p-0"
                        outline={false}
                        bgc="inherit"
                        bgch="inherit"
                        colorh="yellow-400"
                        color="yellow-400"
                        onClick={() => {
                          setSaveCategoryId(category._id!);
                          setEditQuestion(question);
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
                          setDeleteQuestionId(question._id!);
                          toggleDeleteModal();
                        }}
                      >
                        <i className="bx bx-trash-alt" />
                      </Button>
                    </span>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          ) : (
            <div className="w-full py-4 flex justify-center items-center">
              No questions exist for this category
            </div>
          )}
          <div className="py-2 w-full flex justify-center">
            <Button
              classes="px-3 py-1 text-xs"
              onClick={() => {
                setSaveCategoryId(category._id!);
                setEditQuestion(null);
                toggleSaveModal();
              }}
            >
              <i className="bx bxs-add-to-queue mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
