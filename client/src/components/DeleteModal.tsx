import React from "react";
import Modal from "./modal";

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  desc: string;
  onClose: (fetch?: boolean) => void;
  onSubmit: () => void;
}

const DeleteModal = ({
  isOpen,
  title,
  desc,
  onClose,
  onSubmit,
}: DeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      showFooter={false}
      height={170}
      width={400}
    >
      <div className="w-full text-lg px-4">{desc}</div>
      <div className="w-full flex justify-between px-4 pb-3 mt-6">
        <button
          onClick={() => onClose()}
          className="bg-white border rounded px-4 py-1 hover:bg-gray-100 text-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit()}
          className="bg-red-600 font-bold text-white rounded px-4 py-1 hover:bg-red-400 text-sm cursor-pointer"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
