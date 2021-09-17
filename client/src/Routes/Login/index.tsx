import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import Button from "../../Components/Button";
import useData from "./data";

const LoginForm: React.FC = () => {
  const { state, handleSubmit } = useData();
  const { loading } = state;

  return (
    <div className="h-screen grid grid-rows-6 grid-flow-col bg-gray-50">
      <div className="row-start-2 md:grid md:grid-cols-8">
        <div className="m-6 p-6 shadow-md bg-white rounded md:col-start-4 md:col-span-2">
          <div className="text-3xl grid grid-col-1 text-center mb-6">
            <b>Login</b>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => handleSubmit(values)}
          >
            <Form>
              <div className="my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email address"
                  autoComplete="email"
                  className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="my-3">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="text-xs text-indigo-800 hover:underline cursor-pointer">
                    Forgot password?
                  </div>
                </div>
                <Field
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Type your password"
                  autoComplete="password"
                  className="mt-1 block w-full py-2 px-3 border-0 border-b-2 border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="my-8 grid grid-cols-1 text-center">
                <Button type="submit" loading={loading}>
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
