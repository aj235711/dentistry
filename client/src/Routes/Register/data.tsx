import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
      const { data } = await axios.post("http://localhost:5000/signup", values);
      console.log(data);
      setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit };
};

export default useData;
