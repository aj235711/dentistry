import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { serverLink } from "../../utils/serverlink";

const useData = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");

  const state = {
    loading,
    otp,
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${serverLink}/login`, values);
      console.log(data);
      setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit, setOtp };
};

export default useData;
