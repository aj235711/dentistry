import * as React from "react";
import { toast } from "react-toastify";

import { Modal, ModalBody, Button } from "../../../Components";
import { POST } from "../../../utils/axios";

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  onDone: () => void;
  submissionId: string;
}

const DeleteSubmissionModal: React.FC<IProps> = ({
  isOpen,
  toggle,
  onDone,
  submissionId,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const deleteSubmission = async () => {
    try {
      setLoading(true);
      await POST("deleteSubmission", { submissionId });
      toast.success("Submission deleted successfully");
      onDone();
      toggle();
    } catch (err) {
      toast.error("Unexpected error occured");
    } finally {
      setLoading(false);
    }
  };

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
            onClick={deleteSubmission}
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

export default DeleteSubmissionModal;
