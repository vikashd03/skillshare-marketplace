import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  width?: number;
  height?: number | string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const ModalContent = ({
  children,
  isOpen,
  onClose,
  title,
  width = 500,
  height = 500,
  showHeader = true,
  showFooter = true,
}: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 bg-black/20 z-[100] flex justify-center items-center transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div
        className="bg-white rounded-lg shadow-lg flex flex-col justify-between items-center"
        style={{ width, height }}
      >
        {showHeader && (
          <div className="w-full h-10 bg-gray-300 rounded-t-lg flex justify-between items-center px-3">
            <div className="text-blue-900 font-semibold">{title}</div>
            <button
              onClick={onClose}
              className="bg-white rounded px-1 py-[1px] text-sm border hover:bg-gray-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
        <div className="w-full flex-1 p-4 overflow-auto">{children}</div>
        {showFooter && (
          <div className="w-full h-10 bg-gray-300 rounded-b-lg flex justify-between items-center px-3">
            <button
              className="bg-white rounded px-3 py-1 text-sm border hover:bg-gray-100 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="bg-teal-200 rounded px-3 py-1 text-sm hover:bg-teal-300 cursor-pointer">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById("modal-root");
  return ReactDOM.createPortal(children, modalRoot || document.body);
};

const Modal = (props: ModalProps) => {
  return (
    <ModalPortal>
      <ModalContent {...props} />
    </ModalPortal>
  );
};

export default Modal;
