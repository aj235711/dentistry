import * as React from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "../../../../../Components";
import useData from "./data";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  onDone: () => void;
  _id: string;
}

const DeleteCategoryModal: React.FC<IProps> = ({
  isOpen,
  toggle,
  onDone,
  _id,
}) => {
  const { loading, deleteCategory } = useData({ _id, toggle, onDone });
  return (
    <Modal>
      <ModalBody classes="flex flex-wrap justify-center items-center bg-white rounded-md">
        <p className="p-3 w-full text-center">
          Are you sure you want to delete this category?
        </p>
        <div className="p-3 w-full flex flex-wrap justify-center items-center">
          <Button
            disabled={loading}
            classes="mx-1 px-3 py-1"
            rounded="md"
            onClick={toggle}
          >
            No
          </Button>
          <Button
            loading={loading}
            onClick={deleteCategory}
            classes="mx-1 px-3 py-1"
            rounded="md"
          >
            Yes
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCategoryModal;
