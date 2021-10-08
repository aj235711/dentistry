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

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${serverLink}/login`, values);
      console.log(data);
      setLoading(false);
      if (!data.success) {
        if (data.statusCode === 0) {
          toast.error("User not found");
        } else if (data.statusCode === 1) {
          toast.error("Incorrect password");
        } else {
          toast.error("An unknown error occured");
        }
        return;
      }
      history.push("/otp", { email: values.email, password: values.password });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit };
};

export default useData;
