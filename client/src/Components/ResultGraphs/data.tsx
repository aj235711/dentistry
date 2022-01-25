import * as React from "react";
import { toast } from "react-toastify";

import { IResultItem } from "../../interfaces/result";
import { GET } from "../../utils/axios";

interface IParams {
  submissionId: string;
}

const useData = ({ submissionId }: IParams) => {
  const [results, setResults] = React.useState<IResultItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const state = { results, loading };

  const getResults = async () => {
    setLoading(true);
    try {
      const { data } = await GET("submissionResults", { submissionId });
      setResults(data.results);
    } catch (err) {
      console.log(err);
      toast.error("Trouble loading the results");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getResults();
  }, []);

  return { state };
};

export default useData;
