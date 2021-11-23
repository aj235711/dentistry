import * as React from "react";
import { Formik, Form, Field } from "formik";

import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "../../../../../Components";
import useData from "./data";
import { ICategory } from "../../../../../interfaces/submission";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  onDone: () => void;
  editCategory: ICategory | null;
}

const AddCategoryModal: React.FC<IProps> = ({
  isOpen,
  toggle,
  onDone,
  editCategory,
}) => {
  const {
    name: currName = "",
    weightage: currWeightage = 1,
    description: currDescription = "",
    _id = "",
  } = editCategory || {};
  const { state, setDescription, handleSubmit } = useData({
    onDone,
    toggle,
    currDescription,
    _id,
  });
  const { saveCategoryLoading, description } = state;

  return (
    <Modal isOpen={isOpen} toggle={toggle} classes="w-11/12 md:w-1/3">
      <Formik
        initialValues={{
          name: currName,
          description,
          weightage: currWeightage,
        }}
        onSubmit={(values, _) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <ModalHeader toggle={toggle}>Add Category</ModalHeader>
          <ModalBody classes="bg-white pb-4">
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="my-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Category Name"
                  className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                />
              </div>
              <div className="my-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weightage
                </label>
                <Field
                  required
                  type="number"
                  name="weightage"
                  id="weightage"
                  min={1}
                  placeholder="Category Weightage"
                  className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                />
              </div>
            </div>
            <div className="my-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Will be displayed as section headings to the user)
              </label>
              <textarea
                required
                name="description"
                id="description"
                placeholder="Description"
                className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </ModalBody>
          <ModalFooter classes="py-3 flex justify-end items-center px-3">
            <Button
              classes="px-3 py-1 text-xs mx-1"
              // bgc="gray-500"
              bgch="white"
              colorh="black"
              outline={false}
              // color="white"
              rounded="sm"
              disabled={saveCategoryLoading}
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              classes="pr-3 pl-2 py-1 text-xs mx-1"
              type="submit"
              // bgc="green-500"
              // bgch="green-700"
              // outline={false}
              // color="white"
              rounded="sm"
              loading={saveCategoryLoading}
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

export default AddCategoryModal;
