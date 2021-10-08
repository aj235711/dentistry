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
      const { data } = await axios.post(`${serverLink}/signup`, values);
      if (!data.success) {
        setLoading(false);
        const { statusCode } = data;
        if (!statusCode) {
          toast.error("User already exists");
        } else {
          toast.error("An unexpected error occured");
        }
        return;
      }
      try {
        const { data } = await axios.post(`${serverLink}/login`, values);
        if (!data.success) {
          toast.error("An unexpected error occured");
          setLoading(false);
          return;
        } else {
          history.push("/otp", {
            email: values.email,
            password: values.password,
          });
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit };
};

export default useData;
