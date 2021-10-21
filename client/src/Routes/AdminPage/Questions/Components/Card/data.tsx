import * as React from "react";

const useData = () => {
  const [isCollapsed, setCollapsed] = React.useState<boolean>(true);

  const state = {
    isCollapsed,
  };

  return { state, setCollapsed };
};

export default useData;
