import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { serverLink } from "../../utils/serverlink";

const useData = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);

  const state = {
    loading,
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const { data } = await axios.post<{ success: boolean; msg: string }>(
        `${serverLink}/signup`,
        values
      );
      if (data.success) setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit };
};

export default useData;
