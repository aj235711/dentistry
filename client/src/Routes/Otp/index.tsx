import * as React from "react";
import OtpInput from "react-otp-input";

import Button from "../../Components/Button";
import useData from "./data";

const LoginForm: React.FC = () => {
  const { state, handleSubmit, setOtp } = useData();
  const { loading, otp } = state;

  return (
    <div className="h-screen w-screen flex justify-center content-center items-center bg-gray-50">
      <div className="h-auto bg-white text-center shadow-md">
        <div className="bg-black text-white font-mono py-2">
          <b>Enter the OTP</b>
        </div>
        <div className="px-2 md:px-8 pt-4 pb-8">
          <OtpInput
            value={otp}
            onChange={(val: string) => setOtp(val)}
            numInputs={4}
            separator={<span>-</span>}
            containerStyle={{
              marginTop: 30,
              marginBottom: 20,
            }}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 1rem",
              fontSize: "2rem",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.3)",
            }}
            shouldAutoFocus
            hasErrored={!otp || otp.toString().length < 4}
            errorStyle={{ border: "1px solid red" }}
          />
          <h6>OTP sent to number 8279416505</h6>
          <Button classes="py-0 px-9 mt-3 w-full" rounded="3xl">
            Submit
          </Button>
          <Button outline={false} classes="mt-1" bgch="white" colorh="gray-700">
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
