import * as React from "react";

interface IProps {
  classes?: string;
}

const Modal: React.FC<IProps> = ({ children, classes }) => {
  return (
    <>
      <div className={`p-3 ${classes || ""}`}>{children}</div>
    </>
  );
};

export default Modal;
