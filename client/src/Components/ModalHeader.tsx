import * as React from "react";

interface IProps {
  toggle?: () => void;
  classes?: string;
}

const Modal: React.FC<IProps> = ({ children, toggle, classes }) => {
  return (
    <>
      <div
        className={`flex flex-row justify-between items-center p-2 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg ${
          classes || ""
        }`}
      >
        <p className="font-semibold text-gray-800">{children || "Header"}</p>
        <i className="bx bx-x text-2xl cursor-pointer" onClick={toggle} />
      </div>
    </>
  );
};

export default Modal;
