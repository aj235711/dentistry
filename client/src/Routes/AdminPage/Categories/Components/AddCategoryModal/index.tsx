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
    description: currDescription = "",
    _id = "",
    displayOrder: currDisplayOrder = 0,
    showNa: currShowNa = "YES",
  } = editCategory || {};
  console.log(currShowNa);
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
          displayOrder: currDisplayOrder,
          showNa: currShowNa,
        }}
        onSubmit={(values, _) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <ModalHeader toggle={toggle}>
            {!editCategory ? "Add Category" : "Edit Category"}
          </ModalHeader>
          <ModalBody classes="bg-white pb-4 px-5">
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
                  htmlFor="displayOrder"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Order
                </label>
                <Field
                  required
                  type="number"
                  name="displayOrder"
                  id="displayOrder"
                  placeholder="Display Order"
                  className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm rounded-md"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4">
              <div className="my-3">
                <label
                  id="showNa"
                  className="block text-sm font-medium text-gray-700"
                >
                  Show N/A Option
                </label>
                <div role="group" aria-labelledby="showNa">
                  <label className="pr-2">
                    <Field type="radio" name="showNa" value="YES" />
                    Yes
                  </label>
                  <label className="px-2">
                    <Field type="radio" name="showNa" value="NO" />
                    No
                  </label>
                </div>
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
              bgch="white"
              colorh="black"
              outline={false}
              rounded="sm"
              disabled={saveCategoryLoading}
              onClick={toggle}
            >
              Cancel
            </Button>
            <Button
              classes="pr-3 pl-2 py-1 text-xs mx-1"
              type="submit"
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
