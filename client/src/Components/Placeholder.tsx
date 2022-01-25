import * as React from "react";

interface IProps {
  height: number;
}

const Placeholder: React.FC<IProps> = ({ height }) => {
  return (
    <>
      <div
        style={{ height }}
        className="flex justify-center items-center w-full"
      >
        <i className="bx bx-loader-alt bx-spin text-4xl" />
      </div>
    </>
  );
};

export default Placeholder;
