import * as React from "react";

interface IProps {
  isOpen?: boolean;
  toggle?: () => void;
  classes?: string;
}

const Modal: React.FC<IProps> = ({
  isOpen = true,
  toggle,
  classes,
  children,
}) => {
  return (
    <>
      <div
        className="main-modal flex justify-center items-center bg-black antialiased bg-opacity-40"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          ...(!isOpen && {
            visibility: "hidden",
          }),
        }}
        onClick={toggle}
      >
        <div
          className={`flex flex-col mx-auto rounded-lg border border-gray-300 shadow-xl ${
            classes || ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
