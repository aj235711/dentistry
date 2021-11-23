import * as React from "react";

import NotFoundImg from "../utils/NotFound.jpg";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-wrap text-gray-800">
      <div className="h-1/3 flex justify-center items-center flex-wrap">
        <div className="w-full flex justify-center">
          <i className="bx bx-error-circle text-9xl" />
        </div>
        <div className="w-full flex justify-center text-5xl">404 Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
