import * as React from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";

import Button from "../../Components/Button";
import useData from "./data";
import { login as loginAction } from "../../Store/Actions/UserActions";

type mapDispatchProps = ReturnType<typeof mapDispatchToProps>;

type IProps = mapDispatchProps;

const LoginForm: React.FC<IProps> = ({ login }) => {
  const { state, handleSubmit, setOtp, resend } = useData({ login });
  const { loading, otp, resendLoading } = state;

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
          <Button
            classes="py-0 px-9 mt-3 w-full"
            rounded="3xl"
            loading={loading}
            onClick={handleSubmit}
            disabled={resendLoading}
          >
            Submit
          </Button>
          <Button
            outline={false}
            classes="mt-1 px-3 py-1"
            bgch="white"
            colorh="gray-700"
            loading={resendLoading}
            disabled={loading}
            onClick={resend}
          >
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (token: string) => dispatch(loginAction(token)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
