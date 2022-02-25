import * as React from "react";

export type ITab = "RESULTS" | "RESPONSES";

export const useData = () => {
  const [currTab, setCurrTab] = React.useState<ITab>("RESPONSES");

  const state = { currTab };

  return {
    state,
    setCurrTab,
  };
};
