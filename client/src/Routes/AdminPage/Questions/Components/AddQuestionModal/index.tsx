import * as React from "react";
import { Formik, Form } from "formik";

import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "../../../../../Components";
import useData from "./data";
import { IQuestion } from "../../../../../interfaces/submission";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  onDone: () => void;
  editQuestion: IQuestion | null;
  categoryId: string;
}

const AddQuestionModal: React.FC<IProps> = ({
  isOpen,
  toggle,
  onDone,
  editQuestion,
  categoryId,
}) => {
  const { text: currText = "", _id = "" } = editQuestion || {};
  const { state, setText, handleSubmit } = useData({
    onDone,
    toggle,
    currText,
    _id,
    categoryId,
  });
  const { saveQuestionLoading, text } = state;

  return (
    <Modal isOpen={isOpen} toggle={toggle} classes="w-11/12 md:w-1/3">
      <Formik
        initialValues={{
          text,
        }}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <Form>
          <ModalHeader toggle={toggle}>Add Question</ModalHeader>
          <ModalBody classes="bg-white pb-5">
            <div className="my-1 w-full">
              <label
                htmlFor="questionText"
                className="block text-sm font-medium text-gray-700"
              >
                Question Text
              </label>
              <textarea
                required
                name="text"
                id="text"
                placeholder="Question Text"
                className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
          </ModalBody>
          <ModalFooter classes="py-3 flex justify-end items-center px-3">
            <Button
              classes="px-3 py-1 text-xs mx-1"
              bgch="white"
              colorh="black"
              outline={false}
              rounded="sm"
              disabled={saveQuestionLoading}
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              classes="pr-3 pl-2 py-1 text-xs mx-1"
              type="submit"
              rounded="sm"
              loading={saveQuestionLoading}
            >
              <i className="bx bx-plus mr-1" />
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddQuestionModal;
