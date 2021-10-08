import * as React from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import { serverLink } from "../../utils/serverlink";
import { toast } from "react-toastify";

interface IParams {
  login: (token: string) => void;
}

const useData = ({ login }: IParams) => {
  const history = useHistory();
  const location: any = useLocation();
  const { email, password } = location.state
    ? location.state
    : { email: "", password: "" };
  const [loading, setLoading] = React.useState<boolean>(false);
  const [resendLoading, setResendLoading] = React.useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>("");

  const state = {
    loading,
    otp,
    resendLoading,
  };

  const resend = async () => {
    try {
      await axios.post(`${serverLink}/login`, { email, password });
      setResendLoading(false);
    } catch (err) {
      console.log(err);
      setResendLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${serverLink}/verifyOtp`, {
        email,
        otp,
      });
      console.log(data);
      setLoading(false);
      if (!data.success) {
        toast.error("Invalid OTP");
        return;
      }
      login(data.token);
      history.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { state, setLoading, handleSubmit, setOtp, resend };
};

export default useData;
